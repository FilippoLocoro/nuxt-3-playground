<template>
    <nav class="navbar bg-white rounded-box flex w-full gap-2 shadow max-sm:flex-col sm:items-center">
        <div class="flex w-full items-center justify-between">
            <div class="navbar-start items-center justify-between max-sm:w-full">
                <a class="link text-base-content/90 link-neutral text-xl font-semibold no-underline" href="#">
                    FlyonUI
                </a>
                <div class="flex gap-2">
                    <div class="sm:hidden">
                        <button type="button" class="collapse-toggle btn btn-outline btn-secondary btn-sm btn-square"
                            data-collapse="#multilevel-navbar-collapse" aria-controls="multilevel-navbar-collapse"
                            aria-label="Toggle navigation">
                            <span class="icon-[tabler--menu-2] collapse-open:hidden size-4"></span>
                            <span class="icon-[tabler--x] collapse-open:block hidden size-4"></span>
                        </button>
                    </div>
                    <div class="relative">
                        <select class="select select-floating max-w-sm" aria-label="Select language"
                            @change="changeLocale($event)">
                            <!-- Generate options dynamically based on availableLocales -->
                            <option v-for="localeOption in availableLocales" :key="localeOption.code"
                                :value="localeOption.code">
                                {{ localeOption.code.toUpperCase() }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div id="multilevel-navbar-collapse"
            class="sm:navbar-end collapse hidden grow basis-full gap-2 overflow-hidden transition-[height] duration-300 max-sm:w-full">
            <div
                class="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end] max-sm:[--placement:bottom]">
                <button id="nested-dropdown" type="button"
                    class="dropdown-toggle btn btn-text text-base-content/80 dropdown-open:bg-base-content/10 dropdown-open:text-base-content/90 max-sm:px-2"
                    aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                    Pages
                    <span class="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
                </button>
                <div class="dropdown-menu dropdown-open:opacity-100 z-20 hidden min-w-60" role="menu"
                    aria-orientation="vertical" aria-labelledby="dropdown-collapse">
                    <div>
                        <a class="dropdown-item" href="#">
                            <span class="icon-[tabler--stack-front]"></span>
                            Landing page
                        </a>
                    </div>
                    <div>
                        <a class="dropdown-item" href="#">
                            <span class="icon-[tabler--login]"></span>
                            Login page
                        </a>
                    </div>
                    <div>
                        <button id="nested-collapse-pages"
                            class="collapse-toggle dropdown-item collapse-open:text-base-content/90 collapse-open:bg-base-content/10 justify-between"
                            data-collapse="#nested-collapse-pages-content">
                            <span class="flex items-center gap-x-3.5">
                                <span class="icon-[tabler--users]"></span>
                                Users
                            </span>
                            <span class="icon-[tabler--chevron-down] collapse-open:rotate-180 size-4"></span>
                        </button>
                        <div class="collapse hidden w-full overflow-hidden transition-[height] duration-300"
                            aria-labelledby="nested-collapse-pages" id="nested-collapse-pages-content">
                            <ul class="py-3 ps-3">
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <span class="icon-[tabler--point]"></span>
                                        User Details
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <span class="icon-[tabler--point]"></span>
                                        Teams
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <span class="icon-[tabler--point]"></span>
                                        Projects
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <span class="icon-[tabler--point]"></span>
                                        Connections
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <button id="nested-collapse-pages-2"
                            class="collapse-toggle dropdown-item collapse-open:text-base-content/90 collapse-open:bg-base-content/10 justify-between"
                            data-collapse="#nested-collapse-pages-content-2">
                            <span class="flex items-center gap-x-3.5">
                                <span class="icon-[tabler--user-pentagon]"></span>
                                Account settings
                            </span>
                            <span class="icon-[tabler--chevron-down] collapse-open:rotate-180 size-4"></span>
                        </button>
                        <div class="collapse hidden w-full overflow-hidden transition-[height] duration-300"
                            aria-labelledby="nested-collapse-pages-2" id="nested-collapse-pages-content-2">
                            <ul class="py-3 ps-3">
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <span class="icon-[tabler--point]"></span>
                                        Account
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <span class="icon-[tabler--point]"></span>
                                        Security
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <span class="icon-[tabler--point]"></span>
                                        Billing & plans
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <span class="icon-[tabler--point]"></span>
                                        Notifications
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <span class="icon-[tabler--point]"></span>
                                        Memberships
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]">
                <button id="nested-dropdown" type="button"
                    class="dropdown-toggle btn btn-text text-base-content/80 dropdown-open:bg-base-content/10 dropdown-open:text-base-content/90 max-sm:px-2"
                    aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                    Apps
                    <span class="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
                </button>
                <div class="dropdown-menu dropdown-open:opacity-100 z-20 hidden min-w-60" role="menu"
                    aria-orientation="vertical" aria-labelledby="dropdown-collapse">
                    <div>
                        <a class="dropdown-item" href="#">
                            <span class="icon-[tabler--brand-hipchat]"></span>
                            Chat
                        </a>
                    </div>
                    <div>
                        <a class="dropdown-item" href="#">
                            <span class="icon-[tabler--mail]"></span>
                            Email
                        </a>
                    </div>
                    <div>
                        <button id="nested-collapse"
                            class="collapse-toggle dropdown-item collapse-open:text-base-content/90 collapse-open:bg-base-content/10 justify-between"
                            data-collapse="#nested-collapse-content">
                            <span class="flex items-center gap-x-3.5">
                                <span class="icon-[tabler--shopping-cart]"></span>
                                Ecommerce
                            </span>
                            <span class="icon-[tabler--chevron-down] collapse-open:rotate-180 size-4"></span>
                        </button>
                        <div class="collapse hidden w-full overflow-hidden transition-[height] duration-300"
                            aria-labelledby="nested-collapse" id="nested-collapse-content">
                            <ul class="py-3 ps-3">
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <span class="icon-[tabler--point]"></span>
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <span class="icon-[tabler--point]"></span>
                                        Products
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <span class="icon-[tabler--point]"></span>
                                        Shipping
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <span class="icon-[tabler--point]"></span>
                                        Settings
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <button id="nested-collapse-2"
                            class="collapse-toggle dropdown-item collapse-open:text-base-content/90 collapse-open:bg-base-content/10 justify-between"
                            data-collapse="#nested-collapse-content-2">
                            <span class="flex items-center gap-x-3.5">
                                <span class="icon-[tabler--book]"></span>
                                Academy
                            </span>
                            <span class="icon-[tabler--chevron-down] collapse-open:rotate-180 size-4"></span>
                        </button>
                        <div class="collapse hidden w-full overflow-hidden transition-[height] duration-300"
                            aria-labelledby="nested-collapse-2" id="nested-collapse-content-2">
                            <ul class="py-3 ps-3">
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <span class="icon-[tabler--point]"></span>
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <span class="icon-[tabler--point]"></span>
                                        Courses
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <span class="icon-[tabler--point]"></span>
                                        Course details
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <span class="icon-[tabler--point]"></span>
                                        Certificates
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>


<script setup>
const switchLocalePath = useSwitchLocalePath()
const { locale, locales, setLocale } = useI18n()

// Only show locales that are not the current one
const availableLocales = computed(() => {
    return locales.value.filter(i => i)
})

// Change locale based on selected value
function changeLocale(event) {
    setLocale(event.target.value)
}
</script>