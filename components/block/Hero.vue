<template>
    <section :class="['block', { 'block--no-margin': noMargin }]">
        <div class="hero relative flex items-center justify-center min-h-[600px] p-6 bg-cover bg-center text-center text-white bg-center"
            :style="{ 'background-image': `url(${block.image?.url || 'default-image.jpg'})` }">
            <div class="absolute inset-0 bg-black bg-opacity-40"></div>
            <div class="relative z-10 max-w-4xl mx-auto">
                <div class="flex item-center justify-center my-2">
                    <div v-if="block.category" :class="['inline uppercase font-bold text-md px-4', {
        'bg-primary': isCategorySki,
        'bg-secondary': isCategorySnowboard
    }]">{{ block.category }}</div>

                </div>
                <h1 v-if="block.title" class="text-4xl font-bold leading-tight mb-3 md:text-4xl lg:text-5xl text-white">
                    {{ block.title }}
                </h1>
                <h2 v-if="block.subtitle" class="text-sm font-medium md:text-lg lg:text-xl text-white">{{ block.subtitle
                    }}
                </h2>
                <a v-if="block.action" :href="block.action" :class="['btn btn-lg', {
        'btn-primary': isCategorySki,
        'btn-secondary': isCategorySnowboard
    }]" disabled>
                    {{ $t('Book now') }}
                </a>
            </div>
        </div>
        <div v-if="block.content" class="container mx-auto py-8 px-6">
            <datocms-structured-text :data="block.content" class="text-black" />
        </div>
    </section>
</template>



<script setup lang="ts">
import { StructuredText as DatocmsStructuredText } from 'vue-datocms';
import { useCategoryCheck } from '~/composables/useCategoryCheck';

const route = useRoute()
const category = ref(route.params.category || '');
const { isCategorySnowboard, isCategorySki } = useCategoryCheck(category);

const {
    block = {},
    noMargin = false,
} = defineProps<{ block?: any; noMargin?: boolean }>()

</script>