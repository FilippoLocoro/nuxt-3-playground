<template>
    <section class="block relative">
        <datocms-image :data="block.image.responsiveImage" />
        <div class="container absolute h-full w-full ">
            <div class="flex flex-col items-center justify-center gap-8 z-10 p-8">
                <h2 class="">{{ block.title }}</h2>
                <datocms-structured-text :data="block.content" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Image as DatocmsImage, StructuredText as DatocmsStructuredText } from 'vue-datocms';

const { block = {} } = defineProps<{ block?: any }>()

console.log('block', block)

</script>