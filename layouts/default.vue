<template>
  <Navbar />
  <slot />
  <Footer />
</template>

<script setup>
import { siteQuery } from '~/utils/graphql'

const { locale } = useI18n()
const localeValue = locale?.value || 'it'

const route = useRoute()

const fetchSiteSettings = async () => {
  try {
    const { data } = await useGraphqlQuery({
      query: siteQuery,
      variables: {
        locale: localeValue,
      },
    })
    return data?.value?._site || {}
  } catch (error) {
    console.error('GraphQL query failed:', error)
    return {}
  }
}

const site = await fetchSiteSettings()

const fallbackSeo = site?.globalSeo?.fallbackSeo || {}

const {
  title = 'Default Title',
  description = 'Default Description',
  image
} = fallbackSeo

useHead({
  title: title,
  meta: [
    // Basic SEO
    { name: 'description', content: description },
    { name: 'keywords', content: '' },

    // Open Graph (OG) metadata for social sharing
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: route.fullPath },
    ...(image ? [{ property: 'og:image', content: image?.url }] : []),

    // Twitter Card metadata
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    ...(image ? [{ name: 'twitter:image', content: image?.url }] : []),

    // Additional meta tags for mobile and accessibility
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#ffffff' },
  ],
  bodyAttrs: {
    class: 'bg-white',
  },
  script: [{ innerHTML: 'console.log("Hello Nuxt")', type: 'text/javascript' }],
})
</script>