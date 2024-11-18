<template>
    <div>
        {{ page.title }}
    </div>
</template>

<script setup>
import { StructuredText as DatocmsStructuredText } from 'vue-datocms';
import { pageQuery, allActivitiesQuery } from '~/utils/graphql'
const { locale } = useI18n()
const route = useRoute()
const page = ref({})
const slug = ref(route.params.slug || '')

async function fetchData() {
    try {
        const pageData = await useGraphqlQuery({
            query: pageQuery,
            variables: { slug: slug.value, locale: locale.value }
        });

        page.value = pageData?.data?.value?.page || {};

        console.log(slug.value)

        const activities = await useGraphqlQuery({
            query: allActivitiesQuery,
            variables: { category: slug.value || '', locale: locale.value }
        });
        console.log('activities', activities)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();
</script>