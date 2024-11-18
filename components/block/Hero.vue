<template>
    <section class="block">
        <div class="hero relative flex items-center justify-center min-h-[60vh] p-5 bg-cover bg-center text-center text-white"
            :style="{ 'background-image': `url(${block.image?.url || 'default-image.jpg'})` }">
            <div class="absolute inset-0 bg-black bg-opacity-40"></div>
            <div class="relative z-10 max-w-2xl mx-auto">
                <h1 v-if="block.title" class="text-2xl font-bold leading-tight mb-3 md:text-3xl lg:text-4xl text-white">
                    {{ block.title }}
                </h1>
                <h2 class="text-sm font-light md:text-lg lg:text-xl text-white">Lorem ipsum</h2>
            </div>
        </div>
        <div class="container mx-auto p-8">
            <datocms-structured-text :data="block.content" />
        </div>
    </section>
</template>



<script setup lang="ts">
import { StructuredText as DatocmsStructuredText } from 'vue-datocms';

const { block = {} } = defineProps<{ block?: any }>()

</script>