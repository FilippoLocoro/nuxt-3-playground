<template>
    <div>
        {{ category.title }}
    </div>
</template>

<script setup>
import { StructuredText as DatocmsStructuredText } from 'vue-datocms';

const { locale } = useI18n()
const route = useRoute()

const slug = route.params.slug || '';

const query = `
  query Category($slug: String!, $locale: SiteLocale!) {
      category(locale: $locale, filter: {slug: {eq: $slug}}) {
          id
          title
          slug
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
      }
  }
`;

const { data, loading, error } = await useGraphqlQuery({
    query,
    variables: {
        slug,
        locale: locale.value
    }
});

const category = data.value?.category || [];
</script>