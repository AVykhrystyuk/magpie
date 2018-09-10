module.exports = {
  env: {
    node: true,
    mocha: true,
  },

  extends: [
    'airbnb-base',
    'plugin:flowtype/recommended'
  ],

  plugins: [
    'flowtype'
  ],

  rules: {
    'no-underscore-dangle': 0,
    'max-len': ['error', { code: 120, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', {
      arrays: 'only-multiline',
      objects: 'only-multiline',
      imports: 'only-multiline',
      exports: 'never',
      functions: 'never',
    }],
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      //'ForOfStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'function-paren-newline': ['error', 'consistent'],
    'arrow-parens': ['error', 'as-needed']
  },
};
