import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Seo } from '@/components/Seo/Seo';
import { useDebounce } from '@/utils/hooks/useDebounce';

import { TemplatesBuilder } from '../builders/template.builder';
import { createLivePreviewFrontendClient } from '../helpers/sanity/frontend';

// import { pageQuery } from '../queries/page';

export default function PreviewPage({ preview }) {
  const router = useRouter();
  const DELAY = 400;

  const [updateTicker, setUpdateTicker] = useState(0);
  const debouncedUpdateTicker = useDebounce(updateTicker, DELAY);
  const [previewLoading, setPreviewLoading] = useState(false);

  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  const type = Array.isArray(router.query.type)
    ? router.query.type[0]
    : router.query.type;

  const [page, setPage] = useState(null);
  const [sitemap] = useState([]);
  const [config] = useState({});
  const [frontendClient, setFrontendClient] = useState(null);
  const [pageI18nPath] = useState({});

  // useEffect(() => {
  //   if (!preview) router.push('/');
  // }, [preview]);

  useEffect(
    () => {
      // if (!preview) return;
      // if (!id) return;
      // let listener;

      /**
       * Get preview token from api with user credentials
       * because we don't want to store it in the frontend
       */

      async function getPreviewToken() {
        const userReq = await fetch(
          `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/users/me`,
          { credentials: 'include' },
        );
        const user = await userReq.json();
        if (!user?.id) return;

        // const res = await fetch(`/api/get-preview-token`, {
        //   method: 'POST',
        //   body: JSON.stringify({ user }),
        // });
        // let { previewToken } = await res.json();
        // previewToken = previewToken.replace(user.id, '');
        // return previewToken;
      }

      /**
       * Create a listener to ping when the data needs to be refreshed
       */

      // async function setupPreviewListener() {
      //   if (listener?.unsubscribe) listener.unsubscribe();
      //   const previewToken = await getPreviewToken();
      //   if (!previewToken) return;
      //   const query = `*[_id == "${id}" || _id == "drafts.${id}"]`;
      //   const frontendClient = await createLivePreviewFrontendClient(previewToken);
      //   listener = frontendClient
      //     .listen(query)
      //     .subscribe(() => setUpdateTicker((n) => n + 1));
      //   setFrontendClient(frontendClient);
      //   setUpdateTicker((n) => n + 1);
      // }
      //
      // setupPreviewListener();
      //
      // return () => {
      //   if (listener?.unsubscribe) listener.unsubscribe();
      // };
    },
    [
      // id
    ],
  );

  // useEffect(() => {
  //   if (!preview) return;
  //   if (debouncedUpdateTicker === 0) return;
  //   setPreviewLoading(true);
  //
  //   async function reload() {
  //     if (!frontendClient) return;
  //
  //     // wait a bit longer to make sure we get the latest
  //     const date = Date.now();
  //     let currentDate = null;
  //     do {
  //       currentDate = Date.now();
  //     } while (currentDate - date < DELAY);
  //
  //     // get either the draft or the published id
  //     const previewId = id.startsWith('drafts.')
  //       ? id
  //       : debouncedUpdateTicker > 1
  //       ? `drafts.${id}`
  //       : id;
  //
  //     const page = await frontendClient.fetch(pageQuery, {
  //       _id: previewId,
  //       _type: type,
  //       sitemap,
  //     });
  //
  //     setPage(page);
  //     setPreviewLoading(false);
  //   }
  //
  //   reload();
  // }, [debouncedUpdateTicker, frontendClient, id, type, sitemap]);

  return null;
  // <>
  //   <Seo page={page} config={config} alternatePaths={alternatePaths} />
  //   <TemplatesBuilder page={page} template={template} />
  // </>
}

export const getStaticProps = async ({ preview = false }) => {
  return { props: { preview }, revalidate: 10 };
};
