module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  plugins: ['security'],
  extends: ['airbnb-base', 'plugin:security/recommended'],
  globals: { requireApp: true },
  settings: {
    'import/ignore': ['.*jaco.*']
  },
  
  rules: {
    'no-param-reassign': ['error', { props: false }],
    'no-unused-expressions': ['error', { allowTernary: true }],
    'import/extensions': ['off', 'never'],
    'no-use-before-define': 'off',
    'function-paren-newline': ['error', 'consistent'],
    'max-len': [
      'error',
      120,
      2,
      {
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreComments: false
      }
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'ignore'
      }
    ],
    'no-underscore-dangle': ['off'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false
      }
    ],
    'class-methods-use-this': [
      'error',
      {
        exceptMethods: [
          'childView',
          'serializeData',
          'childViewEvents',
          'childViewTriggers',
          'className',
          'collectionEvents',
          'defaults',
          'emptyView',
          'events',
          'getTemplate',
          'modelEvents',
          'behaviors',
          'parse',
          'regions',
          'tagName',
          'triggers',
          'ui',
          'validation'
        ]
      }
    ],
    'func-names': ['error', 'as-needed'],
    'comma-dangle': [
      'error',
      {
        objects: 'only-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore'
      }
    ],
    'import/no-unresolved': 'off',
    'security/detect-object-injection': 'off',
    'no-mixed-operators': 'off',
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true, varsIgnorePattern: '^_' }],
    'object-curly-newline': ['off'],
    'require-await': 'error'
  }
};
