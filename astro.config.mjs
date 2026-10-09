import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://perelioy.com',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fi', 'uk', 'ru'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
