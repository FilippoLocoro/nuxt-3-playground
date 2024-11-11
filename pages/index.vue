<template>
  <div>
    <h1>{{ page.title }}</h1>
    <figure v-if="page?.featuredImage?.responsiveImage" class="image">
      <datocms-image :data="page.featuredImage.responsiveImage" />
    </figure>
    <datocms-structured-text :data="page.content" />

    <div v-for="category in categories" :key="category.id" class="card sm:card-side max-w-sm sm:max-w-full">
      <figure v-if="category?.featuredImage?.responsiveImage">
        <datocms-image :data="category.featuredImage.responsiveImage" />
      </figure>
      <div class="card-body">
        <h5 class="card-title mb-2.5">{{ category.title }}</h5>
        <div class="card-actions">
          <NuxtLinkLocale :to="`/category/${category.link.slug}`">{{ category.link.slug }}</NuxtLinkLocale>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pageQuery, allCategoriesQuery } from '~/utils/graphql'
import { Image as DatocmsImage, StructuredText as DatocmsStructuredText } from 'vue-datocms';

// Internationalization setup
const { locale } = useI18n();

// Variables and GraphQL queries
const slug = ref('home');

// State variables for page and categories data
const page = ref({});
const categories = ref([]);

// Fetch data concurrently and handle possible null values
async function fetchData() {
  try {
    const [pageData, categoriesData] = await Promise.all([
      useGraphqlQuery({
        query: pageQuery,
        variables: { slug: slug.value, locale: locale.value }
      }),
      useGraphqlQuery({
        query: allCategoriesQuery,
        variables: { locale: locale.value }
      })
    ]);

    page.value = pageData?.data?.value?.page || {};
    categories.value = categoriesData?.data?.value?.allCategories || [];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
</script>