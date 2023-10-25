module.exports = {
  parser: "vue-eslint-parser",

  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },

  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
  ],

  rules: {
    // override/add rules settings here, such as:
    "vue/no-v-html": "off",
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": "off",
    "vue/multi-word-component-names": "off",
  },
};
