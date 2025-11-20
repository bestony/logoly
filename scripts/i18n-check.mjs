import { spawnSync } from 'node:child_process'
import { mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

async function buildTempLocales() {
  const localeDir = path.resolve('src/i18n/locales')
  const tempDir = await mkdtemp(path.join(tmpdir(), 'logoly-i18n-'))

  const files = (await readdir(localeDir)).filter((file) => file.endsWith('.ts'))
  if (files.length === 0) {
    throw new Error('No locale files found in src/i18n/locales')
  }

  await Promise.all(
    files.map(async (file) => {
      const source = await readFile(path.join(localeDir, file), 'utf8')
      const transformed = source.replace(/export\s+default/, 'module.exports =')
      const target = path.join(tempDir, file.replace(/\.ts$/, '.js'))
      await writeFile(target, transformed, 'utf8')
    }),
  )

  return tempDir
}

async function run() {
  const tempDir = await buildTempLocales()

  const cli = path.resolve('node_modules/.bin/vue-i18n-extract')
  const args = [
    'report',
    '--vueFiles=./src/**/*.vue',
    `--languageFiles=${path.join(tempDir, '*.js')}`,
  ]

  const result = spawnSync(cli, args, { stdio: 'inherit' })

  await rm(tempDir, { recursive: true, force: true })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
