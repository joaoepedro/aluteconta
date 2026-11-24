// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://aluteconta.com.br',
  trailingSlash: 'never',

  // Todas as páginas são geradas no build (HTML estático).
  // Só as rotas com `export const prerender = false` (formulários) rodam na Cloudflare.
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
    prerenderEnvironment: 'node',
  }),

  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/api/'),
      i18n: { defaultLocale: 'pt-BR', locales: { 'pt-BR': 'pt-BR' } },
    }),
  ],

  // Endereços do site antigo → novos (301)
  redirects: {
    '/sobre-a-lu': '/sobre',
    '/portal': '/entrevistas',
  },

  // O site não usa sessões (evita criar um KV na Cloudflare)
  session: false,

  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },

  vite: {
    plugins: [tailwindcss()],
  },
});
