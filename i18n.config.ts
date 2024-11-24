export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'it',
  locales: ['en', 'it'],
  messages: {
    en: {
      'Price list': 'Price list',
      'Book now': 'Book',
      'Discover more': 'Discover more',
    },
    it: {
      'Price list': 'Listino prezzi',
      'Book now': 'Prenota',
      'Discover more': 'Scopri di più',
    },
  },
}));
