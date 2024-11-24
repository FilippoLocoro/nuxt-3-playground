<template>
    <div class="block relative">
        <div class="grid md:grid-cols-2 px-8 gap-8">
            <div v-for="faq in faqs" :key="faq.id">
                <h3 v-if="faq.title" class="font-bold text-xl">{{ faq.title }}</h3>
                <structured-text v-if="faq.content" :data="faq.content" class="text-black" />
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { StructuredText } from 'vue-datocms';

const { faqs = [] } = defineProps<{ faqs?: any }>()

</script>