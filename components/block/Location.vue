<template>
    <div>
        Location Block
    </div>
</template>


<script setup lang="ts">
const { block = {} } = defineProps<{ block?: any }>()

console.log('block', block)
</script>