<template>
  <!-- <Navbar />
  <Menu /> -->
  <div class="container mx-auto">
    <div>
      <div class="flex gap-4 p-4">
        <div>setLocale</div>
        <button @click="setLocale('en')">en</button>
        <button @click="setLocale('it')">it</button>
      </div>
      <div class="flex gap-4 p-4">
        <div>switchLocalePath</div>
        <NuxtLink :to="switchLocalePath('en')">en</NuxtLink>
        <NuxtLink :to="switchLocalePath('it')">it</NuxtLink>
      </div>
      <div class="flex gap-4 p-4">
        <div>Available locale</div>
        <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
          {{ locale.name }}
        </NuxtLink>
      </div>
    </div>
    <slot />
  </div>
  <!-- <Footer /> -->
</template>

<script setup>
const switchLocalePath = useSwitchLocalePath()
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})


</script>