<template>
    <div class="page">
        <Block v-for="block, index in page.blocks" :block="block" :key="`block-${index}`" />

        <div class="py-10 bg-primary">
            <ul class="container mx-auto grid grid-cols-1 gap-4 mx-auto md:grid-cols-2 lg:grid-cols-3 px-8 ">
                <li v-for="activity in activities" :key="activity.id" class="overflow-hidden rounded-2xl">
                    <NuxtLinkLocale
                        :to="{ name: 'activity-category-slug', params: { category: activity.category, slug: activity.slug } }"
                        :locale="locale" class="relative">
                        <datocms-image :data="activity.featuredImage.responsiveImage"
                            class="relative z-1 object-cover h-full w-full max-h-[300px]" />
                        <div
                            class="absolute top-0 left-0 z-10 w-full h-full flex gap-4 flex-col items-center justify-center text-white text-lg text-center px-8 font-bold md:text-xl">
                            {{
            activity.title }}
                            <button class="btn btn-sm btn-primary">{{ $t('Discover more') }}</button>
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

const { locale } = useI18n();
const slug = 'ski'
const category = 'ski'
const page = ref({})
const activities = ref({})

async function fetchData() {
    try {
        const [pageData, activitiesData] = await Promise.all([
            useGraphqlQuery({
                query: PageBySlugQuery,
                variables: { slug: slug, locale: locale.value }
            }),
            useGraphqlQuery({
                query: AllActivitiesByCategoryQuery,
                variables: { category: category, locale: locale.value }
            })
        ]);

        page.value = pageData?.data?.value?.page || {};
        activities.value = activitiesData?.data?.value?.allActivities || [];

    } catch (error) {
        page.value = {};
        activities.value = {};
        console.error("Error fetching data:", error);
    }
}

watch(() => locale.value, fetchData, { immediate: true })

</script>