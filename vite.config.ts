import { execSync } from 'node:child_process'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

const gitSha = (() => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch (error) {
    console.warn('[vite] Unable to read git SHA, falling back to "unknown"', error)
    return 'unknown'
  }
})()

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    plugins: [UnoCSS(), vue(), isDev ? vueDevTools() : null],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: {
      // biome-ignore lint/style/useNamingConvention: global compile-time constants
      __GIT_SHA__: JSON.stringify(gitSha),
      // biome-ignore lint/style/useNamingConvention: global compile-time constants
      __APP_MODE__: JSON.stringify(mode),
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const vendorGroups = [
                { test: 'vue-router', chunk: 'vendor-vue-router' },
                { test: 'vue', chunk: 'vendor-vue' },
                { test: 'pinia', chunk: 'vendor-pinia' },
                { test: '@headlessui', chunk: 'vendor-headlessui' },
              ]

              const matchVendor = vendorGroups.find(({ test }) => id.includes(test))
              return matchVendor?.chunk ?? 'vendor'
            }

            const match = id.match(/src[\\/](views)[\\/](.+?)\\.vue$/)
            if (match) {
              return `view-${match[2].toLowerCase()}`
            }
          },
        },
      },
    },
  }
})
