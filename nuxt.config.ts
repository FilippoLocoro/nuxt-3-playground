import graphqlLoader from 'vite-plugin-graphql-loader';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: [
    '@nuxthub/core',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/scripts',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@formkit/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'https://api.example.com', // Define public runtime config for API base URL
      datocms: {
        apiToken: process.env.NUXT_ENV_DATOCMS_READ_ONLY_API_TOKEN || '',
      },
    },
    emails: {
      rent: process.env.RENT_EMAIL || '',
      from: process.env.FROM_EMAIL || '',
      bcc: process.env.BCC_EMAIL || '',
    },
    mailjet: {
      publicKey: process.env.MJ_APIKEY_PUBLIC || '',
      privateKey: process.env.MJ_APIKEY_PRIVATE || '',
    },
  },
  devtools: { enabled: true },
  hub: {
    database: true,
    kv: true,
    blob: false, // Please enable R2 Storage on your Cloudflare account to leverage Blob storage and try again: https://dash.cloudflare.com/37d02e01a9ccea9dd863b8e8bc7485c0/r2/plans
    cache: false,
  },
  vite: {
    plugins: [graphqlLoader()],
  },
  nitro: {
    experimental: {
      openAPI: true,
    },
    prerender: {
      routes: ['/', '/about', '/contact'], // Pre-render important routes for SEO and performance
    },
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English (US)' },
      { code: 'en-GB', language: 'en-GB', name: 'English (UK)' },
      { code: 'fr', language: 'fr-FR', name: 'Français' },
      { code: 'it', language: 'it-IT', name: 'Italiano' },
      { code: 'de', language: 'de-DE', name: 'Deutsch' },
    ],
    defaultLocale: 'it',
  },
  build: {
    analyze: true, // Enable bundle analysis for performance optimization
  },
  typescript: {
    strict: true, // Enforce strict TypeScript checks
  },
  // generate: {
  //   fallback: true, // Ensure correct fallback for static hosting
  // },
});
