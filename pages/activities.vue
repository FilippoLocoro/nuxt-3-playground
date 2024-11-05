<template>
    <div v-for="activity in activities" v-bind:key="activity.slug">
        <nuxt-link :to="`/activities/${activity.slug}`">
            <h2>{{ activity.title }}</h2>
            <p>Status: {{ activity._status }}</p>
            <p>Published at: {{ activity._firstPublishedAt }}</p>
            <p>Price Range: {{ activity.price1 }} - {{ activity.price4 }}</p>
            <p>Description: {{ activity.description }}</p>
            <p>Content: </p>
            <datocms-structured-text :data="activity.content" />
        </nuxt-link>
    </div>
</template>

<script setup>
import { StructuredText as DatocmsStructuredText } from 'vue-datocms';
import AllActivitiesQuery from '~/graphql/queries/allActivities.gql'

const { data, loading, error } = await useGraphqlQuery({
    query: AllActivitiesQuery
});

console.log(data)

const activities = data.value?.allActivities || [];
</script>