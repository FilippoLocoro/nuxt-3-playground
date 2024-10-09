// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxthub/core'],
  hub: {
    database: true,
    kv: true,
    blob: false, // Please enable R2 Storage on your Cloudflare account to leverage Blob storage and try again: https://dash.cloudflare.com/37d02e01a9ccea9dd863b8e8bc7485c0/r2/plans
    cache: false,
  },
  nitro: {
    experimental: {
      openAPI: true
    }
  },
})