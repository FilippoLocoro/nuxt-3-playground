export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'it',
  locales: ['en', 'it'],
  messages: {
    en: {
      'Price list': 'Price list',
      'Book now': 'Book',
      'Discover more': 'Discover more',
      Ski: 'Ski',
      Snowboard: 'Snowboard',
    },
    it: {
      'Price list': 'Listino prezzi',
      'Book now': 'Prenota',
      'Discover more': 'Scopri di più',
      Ski: 'Sci',
      Snowboard: 'Snowboard',
    },
  },
}));
