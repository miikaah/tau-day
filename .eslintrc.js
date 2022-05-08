module.exports = {
  env: {
    browser: true,
  },
  extends: ["eslint:recommended", "prettier", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "script",
  },
  rules: {
    "no-console": "off",
    "no-async-promise-executor": "off",
    "prettier/prettier": 1,
  },
};
