module.exports = {
  env: {
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript'
  ],
  overrides: [],
  ignorePatterns: ['*.js', 'node_modules'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // Other rules you already have
    indent: ['error', 2],
    'no-return-assign': 0,
    'arrow-body-style': 0,
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'react/no-unescaped-entities': 0,
    quotes: [2, 'single', { avoidEscape: true }],
    'max-len': 0,
    'no-shadow': 0,
    'arrow-parens': 0,
    'no-floating-decimal': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-confusing-void-expression': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/no-non-null-assertion': 0,

    // New rules for variable declaration
    'no-var': 'error', // disallow `var` keyword
    'prefer-const': 'error', // prefer `const` where possible
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true
        },
        AssignmentExpression: {
          array: true,
          object: true
        }
      }
    ],
    'no-unused-vars': 'warn' // warn about unused variables
  }
};
