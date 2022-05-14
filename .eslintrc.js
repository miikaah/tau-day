module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "script",
  },
  rules: {
    "no-console": "off",
    "no-async-promise-executor": "off",
    "prettier/prettier": 1,
  },
};
