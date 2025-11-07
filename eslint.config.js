import js from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        // Браузерные глобальные объекты
        console: 'readonly',
        document: 'readonly',
        window: 'readonly',
        CanvasRenderingContext2D: 'readonly',
        HTMLCanvasElement: 'readonly',
        requestAnimationFrame: 'readonly',
        // Добавьте другие по мере необходимости
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,

      // TypeScript правила
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',

      // JavaScript правила
      'no-console': 'warn',
    },
  },
  prettier, // Должен быть последним чтобы перезаписать другие правила
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.js'],
  },
];
