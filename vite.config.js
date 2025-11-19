import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

function exposeStoreInternals() {
  const storePath = fileURLToPath(new URL('./src/stores/store.js', import.meta.url)).replace(
    /\\/g,
    '/'
  );

  return {
    name: 'expose-store-internals',
    enforce: 'post',
    transform(code, id) {
      if (!process.env.VITEST) return null;
      const normalizedId = id.replace(/\\/g, '/');
      if (normalizedId !== storePath) return null;
      if (code.includes('__LOGOLY_STORE_INTERNALS__')) return null;

      const marker =
        'return { node: root, offset: root.childNodes.length };\n}\n\nfunction restoreSelectionSnapshot';
      if (!code.includes(marker)) return null;

      let transformed = code.replace(
        marker,
        'return { node: root, offset: root.childNodes.length };\n}\n\nconst __storeTestOverrides = { resolvePosition: null };\nfunction __callResolvePosition(root, targetOffset) {\n  return typeof __storeTestOverrides.resolvePosition === "function"\n    ? __storeTestOverrides.resolvePosition(root, targetOffset)\n    : resolvePosition(root, targetOffset);\n}\n\nfunction restoreSelectionSnapshot'
      );

      transformed = transformed
        .replace(
          'const startPosition = resolvePosition(editableElement, start);',
          'const startPosition = __callResolvePosition(editableElement, start);'
        )
        .replace(
          'const endPosition = resolvePosition(editableElement, end);',
          'const endPosition = __callResolvePosition(editableElement, end);'
        );

      const exposure = `\nif (typeof globalThis !== "undefined") {\n  globalThis.__LOGOLY_STORE_INTERNALS__ = {\n    getEditableAncestor,\n    captureSelectionSnapshot,\n    resolvePosition,\n    restoreSelectionSnapshot,\n    setResolvePositionOverride(fn) {\n      __storeTestOverrides.resolvePosition = fn;\n    },\n    clearOverrides() {\n      __storeTestOverrides.resolvePosition = null;\n    },\n  };\n}\n`;

      return {
        code: `${transformed}${exposure}`,
        map: null
      };
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls
      }
    }),
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/vuetify-settings.scss'
      }
    }),
    exposeStoreInternals(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vuetify')) return 'vuetify';
            if (id.includes('vue')) return 'vue';
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    esbuild: {
      drop: ['console', 'debugger']
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json-summary', 'html'],
      thresholds: {
        lines: 99,
        functions: 99,
        branches: 99,
        statements: 99
      }
    }
  }
});
