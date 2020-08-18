module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "class-methods-use-this": "off",
    "react/jsx-filename-extension": "off",
    "no-console": "off",
    "react/sort-comp": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "react/state-in-constructor": "off",
  },
};
