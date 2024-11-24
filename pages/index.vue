<template>
  <div class="page">
    <Block v-for="block, index in page.blocks" :block="block" :key="`block-${index}`" />
  </div>
</template>

<script setup lang="ts">
import { PageBySlugQuery } from '~/utils/graphql'

const { locale } = useI18n();
const slug = 'home';
const page = ref({});

async function fetchData() {
  try {
    const [pageData] = await Promise.all([
      useGraphqlQuery({
        query: PageBySlugQuery,
        variables: { slug: slug, locale: locale.value }
      }),
    ]);

    page.value = pageData?.data?.value?.page || {};

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
</script>