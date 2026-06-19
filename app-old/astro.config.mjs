import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import rehypeSlug from 'rehype-slug';

// https://astro.build/config
export default defineConfig({
  site: 'https://opensheets.co.uk',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx({
      rehypePlugins: [rehypeSlug],
    }),
    sitemap(),
  ],
  prefetch: {
    prefetchAll: true,
  },
  devToolbar: {
    enabled: false,
  },
  build: {
    format: 'directory',
  },
});
