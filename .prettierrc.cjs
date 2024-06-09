/** @type {import("prettier").Config} */
module.exports = {
  arrowParens: "always",
  bracketSpacing: true,
  htmlWhitespaceSensitivity: "css",
  jsxSingleQuote: false,
  singleAttributePerLine: true,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  parser: "typescript",
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^@/modules/(.*)$",
    "^@/common/layouts/(.*)$",
    "^@/common/components/(.*)$",
    "^@/common/hooks/(.*)$",
    "^@/common/lib/(.*)$",
    "^@dashboard/(.*)$",
    "^@articles/(.*)$",
    "^@auth/(.*)$",
    "^@categories/(.*)$",
    "^@editor/(.*)$",
    "^@sensitivities/(.*)$",
    "^@ui/(.*)$",
    "^@users/(.*)$",
    "^@custom/(.*)$",
    "^@plate-ui/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^[./]",
    "^@/common/types/(.*)$",
    "^@/common/styles/(.*)$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  overrides: [
    {
      files: "*.scss",
      options: { parser: "scss" },
    },
    {
      files: "*.json",
      options: {
        parser: "json",
      },
    },
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: "*.md",
      options: {
        parser: "markdown",
      },
    },
  ],
};
