module.exports = {
  extends: [
    'airbnb-base',
    'plugin:flowtype/recommended'
  ],

  plugins: [
    'flowtype'
  ],

  rules: {
    /* es6 related */
    // require parens in arrow function arguments
    // https://eslint.org/docs/rules/arrow-parens
    'arrow-parens': ['error', 'as-needed', {
      requireForBlockBody: false,
    }],

    /* styles related */
    // disallow dangling underscores in identifiers
    // https://eslint.org/docs/rules/no-underscore-dangle
    'no-underscore-dangle': ['error', {
      allow: [],
      allowAfterThis: true,
      allowAfterSuper: false,
      enforceInMethodNames: false,
    }],

    // specify the maximum length of a line in your program
    // https://eslint.org/docs/rules/max-len
    'max-len': ['error', {
      code: 120,
      tabWidth: 4,
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    
    // require trailing commas in multiline object literals
    // https://eslint.org/docs/rules/comma-dangle
    'comma-dangle': ['error', {
      arrays: 'only-multiline',
      objects: 'only-multiline',
      imports: 'only-multiline',
      exports: 'never',
      functions: 'never',
    }],

    // enforces new line after each method call in the chain to make it
    // more readable and easy to maintain
    // https://eslint.org/docs/rules/newline-per-chained-call
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],

    // require or disallow an empty line between class members
    // https://eslint.org/docs/rules/lines-between-class-members
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
  }
};
