// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import sonarjs from 'eslint-plugin-sonarjs';

export default tseslint.config({
  files: ['**/*.{ts,tsx}'],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    sonarjs.configs.recommended,
  ],
  ignores: ['**/node_modules', '**/dist', '**/coverage'],
  plugins: {
    prettier,
  },
  rules: {
    'sonarjs/sonar-no-fallthrough': 'off',
    'sonarjs/no-nested-conditional': 'off',
    'sonarjs/todo-tag': 'warn',
  },
});
