/** @type {import("prettier").Config} */
const config = {
  trailingComma: "es5",
  tabWidth: 4,
  semi: false,
  singleQuote: true,
  printWidth: 120,
  plugins: ['prettier-plugin-tailwindcss']
};

module.exports = config;