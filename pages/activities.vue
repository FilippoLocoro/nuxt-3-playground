<template>
    <div v-for="activity in activities" :key="activity.slug">
        <nuxt-link :to="`/activities/${activity.slug}`">
            <h2>{{ activity.title }}</h2>
            <datocms-structured-text :data="activity.content" />
        </nuxt-link>
    </div>
</template>

<script setup>
import { StructuredText as DatocmsStructuredText } from 'vue-datocms';

const { locale } = useI18n()

console.log('locale', locale.value)

const { data, loading, error } = await useGraphqlQuery({
    query: `
    {
        allActivities(locale: ${locale.value}) {
            id
            title
            price1
            price2
            price3
            price4
            category
            order
            slug
            content(locale: ${locale.value}) {
                blocks
                links
                value
            }
            seo {
                description
                title
                image {
                    url
                }
            }
            featuredImage {
                url
                title
                alt
                width
                height
            }
        }
    }`
});

const activities = data.value?.allActivities || [];
</script>