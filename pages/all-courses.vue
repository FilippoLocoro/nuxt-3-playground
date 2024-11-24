<template>
    <div class="page">
        <Block v-for="block, index in page.blocks" :block="block" :key="`block-${index}`" />

        <!-- Ski -->
        <div class="bg-primary py-10">
            <div class="container mb-4 mx-auto px-8">
                <h2 class="text-white">{{ $t('Ski') }}</h2>
            </div>
            <ul class="container mx-auto grid grid-cols-1 gap-4 mx-auto md:grid-cols-2 lg:grid-cols-3 px-8">
                <li v-for="skiActivity in skiActivities" :key="skiActivity.id" class="overflow-hidden rounded-2xl">
                    <NuxtLinkLocale
                        :to="{ name: 'activity-category-slug', params: { category: skiActivity.category, slug: skiActivity.slug } }"
                        :locale="locale" class="relative">
                        <datocms-image :data="skiActivity.featuredImage.responsiveImage"
                            class="relative z-1 object-cover h-full w-full max-h-[300px]" />
                        <div
                            class="absolute top-0 left-0 z-10 w-full h-full flex gap-4 flex-col items-center justify-center text-white text-lg text-center px-8 font-bold md:text-xl">
                            {{
            skiActivity.title }}
                            <button class="btn btn-sm btn-primary">{{ $t('Discover more') }}</button>
                        </div>
                        <div class="absolute top-0 left-0 h-full w-full bg-black bg-opacity-30 z-5"></div>
                    </NuxtLinkLocale>
                </li>
            </ul>
        </div>
        <!-- Snowboard -->
        <div class="bg-secondary py-10">
            <div class="container mb-4 mx-auto px-8">
                <h2 class="text-white">{{ $t('Snowboard') }}</h2>
            </div>
            <ul class="container mx-auto grid grid-cols-1 gap-4 mx-auto md:grid-cols-2 lg:grid-cols-3 px-8 ">
                <li v-for="snowboardActivity in snowboardActivities" :key="snowboardActivity.id"
                    class="overflow-hidden rounded-2xl">
                    <NuxtLinkLocale
                        :to="{ name: 'activity-category-slug', params: { category: snowboardActivity.category, slug: snowboardActivity.slug } }"
                        :locale="locale" class="relative">
                        <datocms-image :data="snowboardActivity.featuredImage.responsiveImage"
                            class="relative z-1 object-cover h-full w-full max-h-[300px]" />
                        <div
                            class="absolute top-0 left-0 z-10 w-full h-full flex gap-4 flex-col items-center justify-center text-white text-lg text-center px-8 font-bold md:text-xl">
                            {{
            snowboardActivity.title }}
                            <button class="btn btn-sm btn-secondary">{{ $t('Discover more') }}</button>
                        </div>
                        <div class="absolute top-0 left-0 h-full w-full bg-black bg-opacity-30 z-5"></div>
                    </NuxtLinkLocale>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Image as DatocmsImage } from 'vue-datocms';
import { PageBySlugQuery, AllActivitiesByCategoryQuery } from '~/utils/graphql'

const { locale } = useI18n()
const slug = 'all-courses'
const page = ref({})
const skiActivities = ref({})
const snowboardActivities = ref({})

async function fetchData() {
    try {
        const [pageData, skiActivitiesData, snowboardActivitiesData] = await Promise.all([
            useGraphqlQuery({
                query: PageBySlugQuery,
                variables: { slug: slug, locale: locale.value }
            }),
            useGraphqlQuery({
                query: AllActivitiesByCategoryQuery,
                variables: { category: 'ski', locale: locale.value }
            }),
            useGraphqlQuery({
                query: AllActivitiesByCategoryQuery,
                variables: { category: 'snowboard', locale: locale.value }
            })
        ]);

        page.value = pageData?.data?.value?.page || {}
        skiActivities.value = skiActivitiesData?.data?.value?.allActivities || [];
        snowboardActivities.value = snowboardActivitiesData?.data?.value?.allActivities || [];
    } catch (error) {
        page.value = {};
        skiActivities.value = {};
        snowboardActivities.value = {};
        console.error("Error fetching data:", error);
    }
}

watch(() => locale.value, fetchData, { immediate: true })
</script>