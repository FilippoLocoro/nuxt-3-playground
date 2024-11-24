<template>
    <div class="block relative py-8">
        <h2 class="mb-4">{{ $t('Frequently Asked Questions') }}</h2>
        <ul class="grid md:grid-cols-2 gap-8">
            <li v-for="faq in faqs" :key="faq.id">
                <h3 v-if="faq.title" class="font-bold text-xl">{{ faq.title }}</h3>
                <structured-text v-if="faq.content" :data="faq.content" class="text-black" />
            </li>
        </ul>
    </div>
</template>


<script setup lang="ts">
import { StructuredText } from 'vue-datocms';

const { faqs = [] } = defineProps<{ faqs?: any }>()

</script>