import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import VersionDialog from '../components/VersionDialog.vue'
import { i18n } from '../i18n'

beforeEach(() => {
  const resizeObserverMock: typeof ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
  // biome-ignore lint/style/useNamingConvention: DOM global name
  ;(globalThis as typeof globalThis & { ResizeObserver: typeof ResizeObserver }).ResizeObserver =
    resizeObserverMock
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('VersionDialog', () => {
  it('opens dialog and copies debug info, then closes', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    const wrapper = mount(VersionDialog, {
      props: { version: 'v1.0.0-test' },
      global: {
        plugins: [i18n],
      },
    })

    expect(wrapper.text()).toContain('v1.0.0-test')

    await wrapper.find('button').trigger('click')
    await flushPromises()

    expect(document.body.innerHTML).toContain(i18n.global.t('component.versionDialog.description'))

    const copyButton = document.querySelector(
      '[data-testid="copy-debug"]',
    ) as HTMLButtonElement | null
    expect(copyButton).toBeTruthy()
    if (!copyButton) {
      throw new Error('copy debug button not found')
    }

    await copyButton.click()
    await flushPromises()

    expect(writeText).toHaveBeenCalledTimes(1)
    const copiedText = writeText.mock.calls[0]?.[0]
    expect(copiedText).toContain('Version: v1.0.0-test')
    await flushPromises()
    expect(document.body.innerHTML).not.toContain(
      i18n.global.t('component.versionDialog.description'),
    )
  })

  it('falls back to unknown platform values when navigator is missing data', async () => {
    const originalNavigator = navigator
    // @ts-expect-error - override for test
    vi.stubGlobal('navigator', {})
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    const wrapper = mount(VersionDialog, {
      props: { version: 'v1.0.0-prod' },
      global: { plugins: [i18n] },
    })

    await wrapper.find('button').trigger('click')
    await flushPromises()

    const copyButton = document.querySelector(
      '[data-testid="copy-debug"]',
    ) as HTMLButtonElement | null
    expect(copyButton).toBeTruthy()
    await copyButton?.click()
    await flushPromises()

    const copiedText = writeText.mock.calls[0]?.[0] as string
    expect(copiedText).toContain('OS: unknown-platform')
    expect(copiedText).toContain('Browser: unknown-user-agent')

    vi.stubGlobal('navigator', originalNavigator)
  })
})
