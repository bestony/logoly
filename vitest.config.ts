import { fileURLToPath } from 'node:url'
import type { InlineConfig } from 'vitest'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig(async (env) => {
  const resolvedViteConfig =
    typeof viteConfig === 'function' ? await viteConfig(env) : (viteConfig as InlineConfig)

  return mergeConfig(resolvedViteConfig as InlineConfig, {
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'lcov'],
        include: ['src/**/*.{ts,vue}'],
        exclude: ['src/main.ts', 'src/env.d.ts', 'src/types/**', 'src/router/types.ts'],
        thresholds: {
          statements: 99,
          branches: 99,
          functions: 99,
          lines: 99,
        },
      },
    },
  })
})
