<template>
  <div>
    <h1>{{ page.title }}</h1>
    <figure class="image">
      <datocms-image :data="page.featuredImage.responsiveImage" />
    </figure>
    <datocms-structured-text :data="page.content" />

    <div v-for="category in categories" :key="category" class="card sm:card-side max-w-sm sm:max-w-full">
      <figure v-if="category?.featuredImage?.responsiveImage">
        <datocms-image :data="category.featuredImage.responsiveImage" />
      </figure>
      <div class="card-body">
        <h5 class="card-title mb-2.5">{{ category.title }}</h5>
        <!-- <p class="mb-3">Esplora tutte le possibilità e le novità che la Scuola Sci e Snowboard Sandomenico offre</p> -->
        <div class="card-actions">
          <NuxtLinkLocale :to="`/category/${category.link.slug}`">{{ category.link.slug }}</NuxtLinkLocale>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toHead, Image as DatocmsImage, StructuredText as DatocmsStructuredText } from 'vue-datocms';

// import { imageFields, seoMetaTagsFields, formatDate } from '~/utils/graphql'

// import { activityQuery } from '~/graphql/queries/activity'

const { locale, locales } = useI18n()
const route = useRoute()

const slug = 'home'

const [pageData, categoriesData] = await Promise.all([
  useGraphqlQuery({
    query: `
      query Page($slug: String!) {
        page(locale: ${locale.value}, filter: {slug: {eq: $slug}}) {
          slug
          title
          id
          featuredImage {
            height
            url
            width
            title
            format
            size
            alt
            responsiveImage {
              aspectRatio
              alt
              base64
              bgColor
              height
              sizes
              src
              srcSet
              title
              webpSrcSet
              width
            }
          }
          content {
            blocks
            links
            value
          }
        }
      }
    `,
    variables: { slug, locale: locale.value }
  }),
  useGraphqlQuery({
    query: `
      query AllCategories {
        allCategories {
          id
          title
          featuredImage {
            responsiveImage {
              aspectRatio
              alt
              base64
              bgColor
              height
              sizes
              src
              srcSet
              title
              webpSrcSet
              width
            }
            height
            url
            width
          }
          link {
            slug(locale: it)
            title(locale: it)
          }
        }
      }
    `
  })
]);


const page = pageData.data.value.page || {}
const categories = categoriesData.data.value.allCategories || [];
// const categories = computed(() => categoriesData.value?.allCategories || [])

// useHead(() => toHead(data.value?.site?.favicon || {}))

</script>