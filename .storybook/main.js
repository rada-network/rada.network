module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-i18n/register.js",
    "storybook-addon-apollo-client",
    "storybook-addon-next-router"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  }
}