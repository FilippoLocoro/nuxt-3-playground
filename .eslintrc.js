module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser', // TypeScript parser
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended', // Vue 3 linting rules
    'plugin:@typescript-eslint/recommended', // TypeScript linting rules
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays Prettier errors as ESLint errors
  ],
  rules: {
    // Add your custom rules here or override specific rules
    'vue/multi-word-component-names': 'off', // Disable rule for single-word component names if needed
    '@typescript-eslint/no-unused-vars': 'error', // To prevent unused variables in TypeScript
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Optional: You can enable this to enforce return types
  },
};
