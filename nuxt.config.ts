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
  plugins: ['~/plugins/flyonui.client.ts'],
  css: ['~/assets/main.css'],
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
  // hub: {
  //   database: true,
  //   kv: true,
  //   blob: false, // Please enable R2 Storage on your Cloudflare account to leverage Blob storage and try again: https://dash.cloudflare.com/37d02e01a9ccea9dd863b8e8bc7485c0/r2/plans
  //   cache: false,
  // },
  vite: {
    plugins: [graphqlLoader()],
  },
  // nitro: {
  //   prerender: {
  //     routes: [], // Pre-render important routes for SEO and performance
  //   },
  // },
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
    vueI18n: './i18n.config.ts',

    locales: [
      { code: 'en', language: 'en-US', name: 'English (US)' },
      { code: 'it', language: 'it-IT', name: 'Italiano' },
    ],
    defaultLocale: 'it',
    customRoutes: 'config', // disable custom route with page components
    // detectBrowserLanguage: {
    //   useCookie: true,
    //   cookieKey: 'i18n_redirected',
    //   alwaysRedirect: false,
    //   fallbackLocale: 'it',
    // },
    pages: {
      'all-courses': {
        it: '/corsi-e-lezioni',
        en: '/courses-and-lessons',
      },
      ski: {
        it: '/sci',
        en: '/ski',
      },
      snowboard: {
        it: '/snowboard',
        en: '/snowboard',
      },
      prices: {
        it: '/tariffe',
        en: '/prices',
      },
      faq: {
        it: '/domande-frequenti',
        en: '/faq',
      },
      'how-to-reach-us': {
        it: '/come-raggiungerci',
        en: '/how-to-reach-us',
      },
      contacts: {
        it: '/contatti',
        en: '/contacts',
      },
      'activity-category-slug': {
        it: '/corso/[category]/[slug]',
        en: '/activity/[category]/[slug]',
      },
      'corso-category-slug': {
        it: '/corso/[category]/[slug]',
        en: '/activity/[category]/[slug]',
      },
    },
  },
  build: {
    analyze: true, // Enable bundle analysis for performance optimization
  },
  typescript: {
    strict: false, // Enforce strict TypeScript checks
  },
  // hooks: {
  //   async 'prerender:routes'(ctx) {
  //     const strapiUrl = process.env.STRAPI_URL
  //     const postsResponse = await fetch(`${strapiUrl}/api/posts?publicationState=live&locale=all&pagination[page]=1&pagination[pageSize=1000]`)
  //     const posts: Strapi4ResponseMany<Post> = await postsResponse.json()

  //     const routes = posts.data.map((post: Strapi4ResponseData<Post>) => {
  //       const locale = post.attributes.locale
  //       const slug = post.attributes.slug

  //       if (locale === 'de') {
  //         return `/posts/${slug}`
  //       } else {
  //         return `/${locale}/posts/${slug}`
  //       }
  //     })

  //     for (const route of routes) {
  //       ctx.routes.add(route)
  //     }
  //   }
  // }

  // generate: {
  //   fallback: true, // Ensure correct fallback for static hosting
  // },
});
