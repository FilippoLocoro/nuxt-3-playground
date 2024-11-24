<template>
    <section :class="['block block-image-content relative', { 'block--no-margin': noMargin }]">
        <datocms-image :data="block.image.responsiveImage" class="relative z-2 object-cover max-h-[500px]" />
        <div class="absolute top-0 left-0 h-full w-full bg-black bg-opacity-30 z-5"></div>
        <div class="absolute top-0 left-0 h-full w-full z-10">
            <div class="flex flex-col items-center justify-center p-8 h-full w-full mx-auto">
                <h2 class="text-white font-bold text-4xl">{{ block.title }}</h2>
                <!-- <datocms-structured-text :data="block.content" class="text-white" /> -->
                <NuxtLinkLocale v-if="block.linkTo" :to="block.linkTo" class="text-white font-bold cursor-pointer">{{
        $t('Discover more') }}
                </NuxtLinkLocale>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Image as DatocmsImage, StructuredText as DatocmsStructuredText } from 'vue-datocms';

const {
    block = {},
    noMargin = false,
} = defineProps<{ block?: any; noMargin?: boolean }>()

</script>