<template>
    <div class="block relative my-10">
        <h2 class="text-white text-xl font-bold">{{ $t('Price list') }}</h2>
        <div class="grid lg:grid-cols-2 gap-10">
            <div>
                <h3 v-if="block.pricesIntro" class="text-white text-xl font-bold">{{ block.pricesIntro }}</h3>
                <ul class="text-lg">
                    <li v-if="block.price1">{{ block.price1 }}</li>
                    <li v-if="block.price2">{{ block.price2 }}</li>
                    <li v-if="block.price3">{{ block.price3 }}</li>
                    <li v-if="block.price4">{{ block.price4 }}</li>
                </ul>
            </div>
            <div>
                <h3 v-if="block.specialPricesIntro" class="text-white text-xl font-bold">{{ block.specialPricesIntro }}
                </h3>
                <ul class="text-lg">
                    <li v-if="block.specialPrice1">{{ block.specialPrice1 }}</li>
                    <li v-if="block.specialPrice2">{{ block.specialPrice2 }}</li>
                    <li v-if="block.specialPrice3">{{ block.specialPrice3 }}</li>
                    <li v-if="block.specialPrice4">{{ block.specialPrice4 }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { block = {} } = defineProps<{ block?: any }>()
</script>