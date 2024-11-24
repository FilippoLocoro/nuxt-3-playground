<template>
    <div class="page page-activity" :class="['text-black', {
        'bg-primary text-white': isCategorySki,
        'bg-secondary text-white': isCategorySnowboard
    }]">
        <BlockHero :block="heroBlock" no-margin />
        <div class="container mx-auto p-8">
            <BlockContent :block="contentBlock" />
            <BlockActivityPrices :block="activityPricesBlock" />
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
            url: page.value?.featuredImage?.url || null
        },
        category: page.value?.category,
        action: '#'
    }
});

const contentBlock = computed(() => {
    return {
        content: page.value?.content
    }
});

const activityPricesBlock = computed(() => {
    return {
        pricesIntro: page.value?.pricesIntro,
        price1: page.value?.price1,
        price2: page.value?.price2,
        price3: page.value?.price3,
        price4: page.value?.price4,
        specialPricesIntro: page.value?.specialPricesIntro,
        specialPrice1: page.value?.specialPrice1,
        specialPrice2: page.value?.specialPrice2,
        specialPrice3: page.value?.specialPrice3,
        specialPrice4: page.value?.specialPrice4,
    }
});

setI18nParams({
    en: { slug: page.value?.slug },
    it: { slug: page.value?.slug }
})

</script>