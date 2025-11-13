import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "src/assets/iconfont/**"],
  },
  js.configs.recommended,
  ...vue.configs["flat/essential"],
  prettierConfig,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "off",
      "vue/multi-word-component-names": "off",
    },
  },
];
