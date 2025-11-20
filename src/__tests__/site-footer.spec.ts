import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { i18n } from '../i18n'

const mountFooter = async () => {
  const SiteFooter = (await import('../components/SiteFooter.vue')).default
  return mount(SiteFooter, {
    global: {
      plugins: [i18n],
    },
  })
}

afterEach(() => {
  vi.resetModules()
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
  ;(globalThis as Record<string, unknown>).__GIT_SHA__ = undefined
})

describe('SiteFooter', () => {
  it('renders copyright text and links', async () => {
    const wrapper = await mountFooter()
    const year = new Date().getFullYear().toString()
    expect(wrapper.text()).toContain(`© ${year} Logoly`)
    expect(wrapper.text()).toContain('v1.0.0-test')

    const links = wrapper.findAll('a')
    const hrefs = links.map((link) => link.attributes('href'))

    expect(hrefs).toContain('https://github.com/bestony/logoly')
    expect(hrefs).toContain('https://x.com/xiqingongzi')
    expect(hrefs).toContain('https://www.ixiqin.com/to-contact-me/')
  })

  it('adds development suffix in dev mode', async () => {
    vi.stubEnv('MODE', 'development')
    vi.stubEnv('DEV', true)
    const wrapper = await mountFooter()
    expect(wrapper.text()).toContain('v1.0.0-development')
  })

  it('falls back to git SHA in production mode', async () => {
    vi.stubEnv('MODE', 'production')
    vi.stubEnv('DEV', false)
    // biome-ignore lint/style/useNamingConvention: injected at build time
    ;(globalThis as { __GIT_SHA__?: string }).__GIT_SHA__ = 'abcdef'

    const wrapper = await mountFooter()
    expect(wrapper.text()).toContain('v1.0.0-abcdef')
  })

  it('uses unknown suffix when git SHA is missing in production', async () => {
    vi.stubEnv('MODE', 'production')
    vi.stubEnv('DEV', false)
    // biome-ignore lint/style/useNamingConvention: injected at build time
    ;(globalThis as { __GIT_SHA__?: string }).__GIT_SHA__ = ''

    const wrapper = await mountFooter()
    expect(wrapper.text()).toContain('v1.0.0-unknown')
  })

  it('falls back to a plain copyright string when the locale key is missing', async () => {
    vi.spyOn(i18n.global, 'te').mockReturnValue(false)

    const wrapper = await mountFooter()
    const year = new Date().getFullYear().toString()
    expect(wrapper.text()).toContain(`© ${year} Logoly`)
  })
})
