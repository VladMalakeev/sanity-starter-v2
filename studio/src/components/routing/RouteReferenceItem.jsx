import { Box, Spinner } from '@sanity/ui';
import React, { useEffect, useState } from 'react';
import { ImLink } from 'react-icons/im';

import { sanityClient } from '../../../helpers/client';

export const RouteReferenceItem = ({ value }) => {
  const [path, setPath] = useState('');

  useEffect(() => {
    let isMounted = true;
    getRouteFullPath(value?._id).then((fullPath) => {
      if (isMounted) setPath(fullPath);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Box padding={4} display="flex" style={{ alignItems: 'center' }}>
      <ImLink style={{ marginRight: '15px' }} />
      <span style={{ fontSize: '16px', fontWeight: '500' }}>
        {path || <Spinner muted />}
      </span>
    </Box>
  );
};

const sitemapQuery = `
    *[_type == "route"]{
       _id,
      "slug": coalesce(slug.current, ''),
      "parent": {
        "slug": parentRoute->slug.current,
        "_id": parentRoute->_id
      }
    }
`;

export const getRouteFullPath = async (routeId) => {
  const sitemap = await sanityClient.fetch(sitemapQuery);

  const getParentRoute = (parentId) => {
    return sitemap.find((route) => route._id === parentId);
  };

  const routesList = sitemap.map((page) => {
    const pathElements = [page.slug];
    const findNestedRoutes = (currentRoute) => {
      if (currentRoute.parent) {
        const parentRoute = getParentRoute(currentRoute.parent._id);
        if (parentRoute?.slug?.length) pathElements.push(parentRoute.slug);
        if (parentRoute?.parent) findNestedRoutes(parentRoute);
      }
    };
    findNestedRoutes(page);
    return {
      path: pathElements.reverse().join('/'),
      id: page._id,
    };
  });

  const routeItem = routesList.find((route) => route.id === routeId);

  if (!routeItem) return '';
  return routeItem.path;
};
