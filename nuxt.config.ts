// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: [
    '@nuxthub/core',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/scripts',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@formkit/nuxt',
  ],
  runtimeConfig: {
    emails: {
      master: process.env.MASTER_EMAIL || '',
      from: process.env.FROM_EMAIL || '',
      bcc: process.env.BCC_EMAIL || '',
    },
    mailjet: {
      publicKey: process.env.MJ_APIKEY_PUBLIC || 'your-api-key',
      privateKey: process.env.MJ_APIKEY_PRIVATE || 'your-api-secret',
    },
  },
  devtools: { enabled: true },
  hub: {
    database: true,
    kv: true,
    blob: false, // Please enable R2 Storage on your Cloudflare account to leverage Blob storage and try again: https://dash.cloudflare.com/37d02e01a9ccea9dd863b8e8bc7485c0/r2/plans
    cache: false,
  },
  nitro: {
    experimental: {
      openAPI: true,
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
});
