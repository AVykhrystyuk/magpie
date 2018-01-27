module.exports = {
  extends: [
    "airbnb-base",
    "plugin:flowtype/recommended",
  ],

  plugins: [
    "flowtype"
  ],

  rules: {
    "no-underscore-dangle": 0,
    "max-len": ["error", {code: 120, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true}],
    "object-curly-spacing": ["error", "never"]
  }
};
