export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'it',
  locales: ['en', 'it'],
  messages: {
    en: {
      'Price list': 'Price list',
      'Book now': 'Book',
    },
    it: {
      'Price list': 'Listino prezzi',
      'Book now': 'Prenota',
    },
  },
}));
