import client from 'part:@sanity/base/client';

export const sanityClient = client.withConfig({ apiVersion: '2021-03-25' });
