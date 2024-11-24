<template>
    <div class="block relative">
        <structured-text :data="block.content" />
    </div>
</template>


<script setup lang="ts">
import { StructuredText } from 'vue-datocms';

const { block = {} } = defineProps<{ block?: any }>()

console.log('block', block)
</script>