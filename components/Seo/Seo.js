import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import TagManager from 'react-gtm-module';

import { BASIC_LOCALE, LANGUAGES } from '@/utils/constants';

export const Seo = ({ config, page, alternatePaths }) => {
  const router = useRouter();

  useEffect(() => {
    if (config?.gtmid) TagManager.initialize({ gtmId: config.gtmid });
  }, [config?.gmtid]);

  if (!config?.seo) return null;

  const seoCanonical = `${config.domain}${router.asPath}`;
  const seoTitle = page.seo?.title || page.title;
  const seoDescription = page.seo?.description || config.seo?.description;

  const imageObject = page?.seo?.image ?? config?.seo?.image;
  const seoImage = {
    url: imageObject.source.src,
    width: imageObject.source.width,
    height: imageObject.source.height,
    alt: imageObject.alt,
  };

  const getLocale = (locale) => (locale === BASIC_LOCALE ? '' : `${locale}/`);
  const languageLinks = () => {
    if (Object.keys(LANGUAGES).length > 1) {
      return Object.keys(alternatePaths).map((lang) => ({
        rel: 'alternate',
        hrefLang: lang,
        href: `${config.domain}/${getLocale(lang)}${alternatePaths[lang]}`,
      }));
    }
    return null;
  };

  return (
    <>
      <NextSeo
        title={seoTitle}
        titleTemplate={`%s - ${config.name}`}
        description={seoDescription}
        canonical={seoCanonical}
        openGraph={{
          type: 'website',
          url: seoCanonical,
          title: seoTitle,
          description: seoDescription,
          images: [seoImage],
          site_name: config.name,
        }}
        additionalLinkTags={languageLinks()}
      />
    </>
  );
};
