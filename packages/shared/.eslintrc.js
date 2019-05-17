module.exports = {
  env: {
    node: true,
    mocha: true,
  },

  extends: [
    require.resolve('@magpie/code-style/.flowtype.eslintrc.js')
  ],

  rules: {
    /* styles related */
    // disallow dangling underscores in identifiers
    // https://eslint.org/docs/rules/no-underscore-dangle
    'no-underscore-dangle': ['off', {
      allow: [],
      allowAfterThis: true,
      allowAfterSuper: false,
      enforceInMethodNames: false,
    }],
  },
};
