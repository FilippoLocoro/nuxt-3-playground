module.exports = {
  root: true, // This ensures that the current directory is treated as the root directory for ESLint,
  env: {
    browser: true, // Specifies that global browser variables (e.g., window, document) are allowed.
    node: true, //  Specifies that global Node.js variables and Node.js scoping are allowed.
    es2021: true, // Specifies that ECMAScript 2021 globals and syntax (like optional chaining, nullish coalescing) are allowed.
  },
  parserOptions: {
    ecmaVersion: 2021, // Sets the ECMAScript syntax version to 2021, enabling modern JavaScript features.
    parser: '@typescript-eslint/parser', // This parser allows ESLint to understand TypeScript syntax, making sure that ESLint can lint .ts and .vue files with TypeScript code.
    sourceType: 'module', // ndicates that ECMAScript modules (ESM) are used, which is typical for modern JavaScript projects like Nuxt.
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended', // Lints Vue 3 files properly.
    'plugin:@typescript-eslint/recommended', // Provides recommended rules for TypeScript linting.
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays Prettier errors as ESLint errors - Ensures Prettier formatting is checked as part of ESLint.
  ],
  rules: {
    // Add your custom rules here or override specific rules
    'vue/multi-word-component-names': 'off', // Disable rule for single-word component names if needed
    '@typescript-eslint/no-unused-vars': 'error', // To prevent unused variables in TypeScript
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Optional: You can enable this to enforce return types
  },
};
