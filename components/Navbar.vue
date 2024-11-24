<template>
    <nav class="navbar bg-white md:h-15 sticky start-0 top-0 w-full gap-2 shadow max-md:flex-col z-50">
        <div class="flex max-md:w-full items-center justify-between">
            <div class="navbar-start items-center justify-between max-md:w-full">
                <a class="link text-base-content/90 link-neutral text-xl font-semibold no-underline" href="/">
                    <Logo />
                </a>
            </div>
            <div class="flex gap-4 items-center flex-row-reverse md:hidden">
                <div>
                    <button @click="toggleMenu" type="button"
                        class="collapse-toggle btn btn-outline btn-secondary btn-sm btn-square"
                        data-collapse="#sticky-navbar-collapse" aria-controls="sticky-navbar-collapse"
                        aria-label="Toggle navigation">
                        <span class="icon-[tabler--menu-2] collapse-open:hidden size-4"></span>
                        <span class="icon-[tabler--x] collapse-open:block hidden size-4"></span>
                    </button>
                </div>
                <NuxtLink v-for="currentLocale in locales " :key="currentLocale.code" @click="closeMenu"
                    :to="switchLocalePath(currentLocale.code)"
                    :class="[{ 'font-bold text-black': currentLocale.code === locale }]">
                    {{ currentLocale.code.toUpperCase() }}
                </NuxtLink>
            </div>
        </div>
        <div class="md:navbar-end collapse grow basis-full overflow-y-scroll overflow-x-hidden transition-[height] duration-300 max-md:w-full"
            :class="isOpen ? 'open' : 'hidden'">
            <ul class="menu md:menu-horizontal gap-2 p-0 text-base">
                <li v-for="(page, index) in allPages" :key="`${page.id}-${page.slug}`">
                    <NuxtLinkLocale :to="page.slug" @click="closeMenu">{{ page.title }}</NuxtLinkLocale>
                    <ul v-if="page.activities.length" class="pl-5 md:hidden">
                        <li v-for="activity in page.activities" :key="`${page.id}-${page.slug}`">
                            <NuxtLinkLocale v-if="activity.slug" @click="closeMenu"
                                :to="{ name: 'activity-category-slug', params: { category: activity.category, slug: activity.slug } }"
                                :locale="locale">
                                {{ activity.title }}
                            </NuxtLinkLocale>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import { AllPagesLinks } from '~/utils/graphql'

const nuxtApp = useNuxtApp()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const isOpen = ref(false)
const allPages = ref([])

nuxtApp.hook('i18n:localeSwitched', ({ oldLocale, newLocale }) => {
    closeMenu()
})

const fetchData = async () => {
    try {
        const { data } = await useGraphqlQuery({
            query: AllPagesLinks,
            variables: {
                locale: locale.value
            },
        })

        allPages.value = data?.value?.allPages || []
    } catch (error) {
        console.error('GraphQL query failed:', error)
        allPages.value = []
        return {}
    }
}

// Watch for changes in `locale` and refetch data
watch(() => locale.value, fetchData, { immediate: true })

const pathForLink = () => {
    return locale.value === 'en' ? '/activity' : '/corso'
}

const categoryForLink = (category) => {
    if (category === 'ski' && locale.value === 'it') {
        return 'sci'
    } else {
        return category
    }
}

const toggleMenu = () => {
    isOpen.value = !isOpen.value
}

const closeMenu = () => {
    isOpen.value = false
}

const openMenu = () => {
    isOpen.value = true
}

</script>