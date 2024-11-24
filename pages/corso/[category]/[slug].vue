<template>
    <div class="page page-activity" :class="['text-black', {
        'bg-primary text-white': isCategorySki,
        'bg-secondary text-white': isCategorySnowboard
    }]">
        <BlockHero :block="heroBlock" no-margin />
        <div class="container mx-auto px-8 my-4">
            <div class="uppercase font-bold text-xl">{{ category }}</div>
        </div>
        <div class="container mx-auto py-4 px-8">
            <BlockContent :block="contentBlock" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ActivityBySlugQuery } from '~/utils/graphql'
import { useCategoryCheck } from '~/composables/useCategoryCheck';

const setI18nParams = useSetI18nParams()
const route = useRoute()
const slug = route.params.slug
const category = ref(route.params.category || '');
const { isCategorySnowboard, isCategorySki } = useCategoryCheck(category);

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

const heroBlock = computed(() => {
    return {
        title: page.value?.title,
        subtitle: page.value?.subtitle,
        image: {
            url: page.value?.featuredImage?.url
        },
        category: page.value.category
    }
});

const contentBlock = computed(() => {
    return {
        content: page.value?.content
    }
});

setI18nParams({
    en: { slug: page.value?.slug },
    it: { slug: page.value?.slug }
})

</script>~/utils