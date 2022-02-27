module.exports = {
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  plugins: ["import", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-console": [
      "error",
      {
        allow: ["warn", "error"],
      },
    ],
    "react/self-closing-comp": "error",
    "object-shorthand": ["error", "always"],
    eqeqeq: ["error", "always"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
