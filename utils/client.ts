import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'i0wo9ev0',
  dataset: 'production',
  apiVersion: '2023-03-29',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
});
