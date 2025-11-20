import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'lcov'],
        statements: 99,
        branches: 99,
        functions: 99,
        lines: 99,
        include: ['src/**/*.{ts,vue}'],
        exclude: ['src/main.ts', 'src/env.d.ts'],
      },
    },
  }),
)
