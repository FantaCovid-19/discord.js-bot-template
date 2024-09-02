const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  eslintConfigPrettier,
  {
    files: ['src/**/*.js'],
    ignore: [
      '**/.github',
      '**/data',
      '**/node_modules',
      '**/.env',
      '**/.env.example',
      '**/.gitignore',
      '**/.git',
      '**/.prettierrc.json',
      '**/LICENSE',
      '**/package.json',
      '**/package-lock.json',
      '**/logs.txt',
      '**/README.md',
    ],
  },
  {
    languageOptions: {
      globals: {
        node: true,
      },
      ecmaVersion: 'latest',
    },
    rules: {
      'handle-callback-err': 'off',
      'max-nested-callbacks': ['error', { max: 4 }],
      'no-console': 'off',
      'no-empty-function': 'error',
      'no-inline-comments': 'error',
      'no-lonely-if': 'error',
      'no-shadow': ['error', { allow: ['err', 'resolve', 'reject'] }],
      'no-var': 'error',
      'prefer-const': 'error',
      'spaced-comment': 'error',
      yoda: 'error',
    },
  },
];
