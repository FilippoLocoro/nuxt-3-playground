<template>
  <div class="page">
    <Block v-for="block, index in page.blocks" :block="block" :key="`block-${index}`" />
  </div>
</template>

<script setup lang="ts">
import { PageBySlugQuery, allCategoriesQuery } from '~/utils/graphql'
import { Image as DatocmsImage, StructuredText as DatocmsStructuredText } from 'vue-datocms';

const { locale } = useI18n();
const slug = ref('home');
const page = ref({});
const categories = ref([]);

async function fetchData() {
  try {
    // const [pageData, categoriesData] = await Promise.all([
    //   useGraphqlQuery({
    //     query: PageBySlugQuery,
    //     variables: { slug: slug.value, locale: locale.value }
    //   }),
    //   useGraphqlQuery({
    //     query: allCategoriesQuery,
    //     variables: { locale: locale.value }
    //   })
    // ]);

    // page.value = pageData?.data?.value?.page || {};
    // categories.value = categoriesData?.data?.value?.allCategories || [];

    const [pageData] = await Promise.all([
      useGraphqlQuery({
        query: PageBySlugQuery,
        variables: { slug: slug.value, locale: locale.value }
      }),
    ]);

    page.value = pageData?.data?.value?.page || {};

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
</script>