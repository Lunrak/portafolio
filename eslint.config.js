import js from '@eslint/js';
import globals from 'globals';

export default [
  // Ignorar todo lo que NO forma parte del portafolio Vite
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.husky/**',
      // Proyectos antiguos / pruebas que no pasan por Vite
      'ahorcado/**',
      'ahorcado-ts/**',
      'memoria/**',
      'dashboard-juegos/**',
      'practica-typescript/**',
      'todo-app/**',
      'script.js',
      // Configs
      'vite.config.js',
      'eslint.config.js',
    ],
  },

  // Reglas recomendadas de ESLint
  js.configs.recommended,

  // Configuración para el código del portafolio
  {
    files: ['js/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'no-undef': 'error',
      'no-useless-assignment': 'error',
    },
  },
];
