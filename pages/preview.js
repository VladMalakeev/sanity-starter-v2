import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { PreviewMode } from '@/components/Preview/PreviewMode';
import { Seo } from '@/components/Seo/Seo';
import { BASIC_LOCALE, DYNAMIC_TYPES, TEMPLATE_TYPES } from '@/utils/constants';
import { getAlternatePath } from '@/utils/functions';
import { useDebounce } from '@/utils/hooks/useDebounce';
import { getClient } from '@/utils/sanity/client';

import { TemplatesBuilder } from '../builders/template.builder';
import { initPreviewPage, previewModules } from '../queries/components/preview';
import { fetchSitemap } from '../queries/sitemap';

export default function PreviewPage({ preview, sitemap }) {
  const router = useRouter();
  const DELAY = 700;
  const configId = 'drafts.siteConfig';

  const { id, type } = router.query;

  const [updateTicker, setUpdateTicker] = useState(0);
  const debouncedUpdateTicker = useDebounce(updateTicker, DELAY);

  const [pageData, setPageData] = useState(null);
  const [pageTemplate, setPageTemplate] = useState(null);
  const [pageConfig, setPageConfig] = useState(null);

  const [previewLoading, setPreviewLoading] = useState(false);
  const [sanityClient, setSanityClient] = useState(null);
  const [pageError, setPageError] = useState(null);

  const removeDraftTag = (postId = '') => {
    if (~postId.indexOf('drafts.')) return postId.replace('drafts.', '');
    return postId;
  };

  useEffect(() => {
    if (!preview) router.push('/');
  }, [preview]);

  useEffect(() => {
    if (router.isReady) {
      if (id && type) {
        const getPreviewToken = async () => {
          const res = await fetch(`/api/sanity/get-preview-token`, {
            method: 'POST',
          });

          const { previewToken } = await res.json();
          return previewToken;
        };

        const initialPreview = async () => {
          /**
           * Get preview token from api with user credentials
           * because we don't want to store it in the frontend
           */

          const previewToken = await getPreviewToken();
          if (!previewToken) {
            setPreviewLoading(false);
            setPageError('Invalid preview token!!!');
          }
          const client = await getClient({ token: previewToken });
          setSanityClient(client);
        };

        initialPreview();
      } else {
        setPreviewLoading(false);
        setPageError('Invalid request params!!!');
      }
    } else {
      setPreviewLoading(true);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (sanityClient) {
      sanityClient
        .fetch(initPreviewPage, {
          id: removeDraftTag(id),
          locale: BASIC_LOCALE,
          templates: Object.values(TEMPLATE_TYPES),
        })
        .then((result) => {
          const pageResult =
            result.page?.length === 2 ? result.page[1] : result.page[0];
          if (!pageResult) {
            if (previewLoading) setPreviewLoading(false);
            setPageError('Invalid page id or type');
            return;
          }

          let allModules = [];
          const pageModules = pageResult.modules;
          const isDynamicPage = Object.values(DYNAMIC_TYPES).includes(
            pageResult._type,
          );

          if (isDynamicPage) {
            allModules = [...pageModules.before, ...pageModules.after];
          } else {
            allModules = pageModules;
          }

          if (allModules?.length) {
            const draftsModulesId = allModules.map(
              (moduleId) => `drafts.${moduleId}`,
            );
            sanityClient
              .fetch(previewModules, { draftsModulesId, allModules })
              .then((modulesData) => {
                let combinedModules = allModules.map((moduleId) => {
                  const draftModule = modulesData.drafts.find(
                    (draft) => draft._id === `drafts.${moduleId}`,
                  );
                  const publishedModule = modulesData.published.find(
                    (published) => published._id === moduleId,
                  );
                  return draftModule ?? publishedModule;
                });

                if (isDynamicPage) {
                  combinedModules = [
                    ...combinedModules.splice(0, pageModules.before.length),
                    ...pageModules.content,
                    ...combinedModules,
                  ];
                }

                if (previewLoading) setPreviewLoading(false);
                setPageConfig(result.config);
                setPageTemplate(pageResult?.template);
                setPageData({ ...pageResult, modules: combinedModules });
              });
          } else {
            if (previewLoading) setPreviewLoading(false);
            setPageConfig(result.config);
            setPageTemplate(pageResult?.template);
            setPageData({ ...pageResult, modules: [] });
          }
        });
    }
  }, [sanityClient, debouncedUpdateTicker]);

  useEffect(() => {
    let pageListener;
    let moduleListener;

    if (sanityClient) {
      const initListeners = async () => {
        if (pageListener?.unsubscribe) pageListener.unsubscribe();
        pageListener = sanityClient
          .listen(`*[_id in [$id, "drafts."+$id, $configId]][0]`, {
            id: removeDraftTag(id),
            configId,
          })
          .subscribe((pageResult) => {
            setUpdateTicker((n) => n + 1);

            // module subscriber
            if (pageResult.result && pageResult.result._id !== configId) {
              const allModules = pageResult.result.modules;

              if (allModules?.length) {
                const draftsModulesId = allModules.map(
                  (module) => `drafts.${module._ref}`,
                );
                if (moduleListener?.unsubscribe) moduleListener.unsubscribe();

                moduleListener = sanityClient
                  .listen(`*[_id in $modules]`, { modules: draftsModulesId })
                  .subscribe(() => setUpdateTicker((n) => n + 1));
              }
            }
          });
      };

      initListeners();
    }

    return () => {
      if (pageListener?.unsubscribe) pageListener.unsubscribe();
      if (moduleListener?.unsubscribe) moduleListener.unsubscribe();
    };
  }, [sanityClient]);

  if (pageError)
    return (
      <div
        style={{
          padding: '20px',
          background: 'yellow',
          fontSize: '24px',
          textAlign: 'center',
        }}
      >
        {pageError}
      </div>
    );
  return (
    <>
      <PreviewMode isLoading={previewLoading} />

      {pageData && pageConfig && (
        <>
          <Seo
            page={pageData}
            config={pageConfig}
            alternatePaths={getAlternatePath(sitemap, {
              id: id.split('drafts.').pop(),
            })}
          />
          <TemplatesBuilder page={pageData} template={pageTemplate} />
        </>
      )}
    </>
  );
}

export const getStaticProps = async ({ preview = false }) => {
  const sitemap = await fetchSitemap();
  return { props: { preview, sitemap }, revalidate: 10 };
};
