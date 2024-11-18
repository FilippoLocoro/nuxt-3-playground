<template>
    <div>
        <BlockHero v-if="isHeroBlock" :block="block" />
        <BlockContact v-if="isContactBlock" :block="block" />
        <BlockLocation v-if="isLocationBlock" :block="block" />
        <BlockContent v-if="isContentBlock" :block="block" />
        <BlockImageContent v-if="isImageContentBlock" :block="block" />
        <BlockVideoContent v-if="isVideoContentBlock" :block="block" />
    </div>
</template>


<script setup lang="ts">

const blockTypes = {
    hero: 'hero',
    contact: 'contact',
    location: 'location',
    content: 'content',
    imagecontent: 'imagecontent',
    videocontent: 'videocontent',
}

const { block = {} } = defineProps<{ block?: any }>()

const blockType = computed(() => {
    return block._modelApiKey || null
})

const isHeroBlock = computed(() => {
    return blockType.value === blockTypes.hero
})

const isContactBlock = computed(() => {
    return blockType.value === blockTypes.contact
})

const isLocationBlock = computed(() => {
    return blockType.value === blockTypes.location
})

const isContentBlock = computed(() => {
    return blockType.value === blockTypes.content
})

const isImageContentBlock = computed(() => {
    return blockType.value === blockTypes.imagecontent
})

const isVideoContentBlock = computed(() => {
    return blockType.value === blockTypes.videocontent
})
</script>