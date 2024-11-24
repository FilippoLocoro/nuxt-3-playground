import { computed } from 'vue';

export const useCategoryCheck = (category: Ref<string | string[]>) => {
  const isCategorySnowboard = computed(() => category.value === 'snowboard');
  const isCategorySki = computed(() => category.value === 'ski' || category.value === 'sci');

  return {
    isCategorySnowboard: isCategorySnowboard.value || false,
    isCategorySki: isCategorySki.value || false,
  };
};
