/// <reference types="vitest" />
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, UserConfig } from 'vite';
import type { InlineConfig } from 'vitest';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@radix-ui/react-dropdown': path.resolve(__dirname, './src/ui'),
    },
  },

  test: {
    globals: true,
    setupFiles: ['./test/setup.ts'],
    environment: 'happy-dom',
  },
} as UserConfig & { test: InlineConfig });
