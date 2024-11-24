<template>
    <div class="page page-activity">
        {{ page.slug }}
    </div>
</template>

<script setup lang="ts">
import { ActivityBySlugQuery } from '~/utils/graphql'

const setI18nParams = useSetI18nParams()
const route = useRoute()
const slug = route.params.slug
const category = route.params.category

const { locale } = useI18n()
const page = ref({})

async function fetchData() {
    try {
        const [pageData] = await Promise.all([
            useGraphqlQuery({
                query: ActivityBySlugQuery,
                variables: { slug: slug, locale: locale.value }
            }),
        ]);

        page.value = pageData?.data?.value?.activity || {}

    } catch (error) {
        page.value = {};
        console.error("Error fetching data:", error);
    }
}

watch(() => locale.value, fetchData, { immediate: true })

setI18nParams({
    en: { slug: page.value?.slug },
    it: { slug: page.value?.slug }
})

console.log(page.value)
</script>