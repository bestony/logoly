import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
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

const mountedWrappers: Array<VueWrapper<InstanceType<typeof VersionDialog>>> = []

afterEach(() => {
  for (const wrapper of mountedWrappers) {
    wrapper.unmount()
  }
  mountedWrappers.length = 0
  document.body.innerHTML = ''
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
    mountedWrappers.push(wrapper)

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
    vi.stubGlobal('navigator', {} as Navigator)
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    const wrapper = mount(VersionDialog, {
      props: { version: 'v1.0.0-prod' },
      global: { plugins: [i18n] },
    })
    mountedWrappers.push(wrapper)

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

  it('shows unknown platform strings when navigator properties are empty', async () => {
    const originalNavigator = navigator
    vi.stubGlobal('navigator', { platform: '', userAgent: '', clipboard: {} } as Navigator)

    const wrapper = mount(VersionDialog, {
      props: { version: 'v1.0.0-prod' },
      global: { plugins: [i18n] },
    })
    mountedWrappers.push(wrapper)

    await wrapper.find('button').trigger('click')
    await flushPromises()

    expect(document.body.textContent).toContain('OS: unknown-platform')
    expect(document.body.textContent).toContain('Browser: unknown-user-agent')

    vi.stubGlobal('navigator', originalNavigator)
  })

  it('renders unknown values when navigator is unavailable', async () => {
    const originalNavigator = navigator
    vi.stubGlobal('navigator', undefined as unknown as Navigator)

    const wrapper = mount(VersionDialog, {
      props: { version: 'v2.0.0-dev' },
      global: { plugins: [i18n] },
    })
    mountedWrappers.push(wrapper)

    const vm = wrapper.vm as unknown as { platform: string; userAgent: string }
    expect(vm.platform).toBe('unknown-platform')
    expect(vm.userAgent).toBe('unknown-user-agent')

    vi.stubGlobal('navigator', originalNavigator)
  })

  it('closes when clipboard API is unavailable', async () => {
    vi.stubGlobal('navigator', { platform: 'Win32', userAgent: 'UA Test' } as Navigator)

    const wrapper = mount(VersionDialog, {
      props: { version: 'v3.0.0' },
      global: { plugins: [i18n] },
    })
    mountedWrappers.push(wrapper)

    await wrapper.find('button').trigger('click')
    await flushPromises()

    const copyButton = document.querySelector(
      '[data-testid="copy-debug"]',
    ) as HTMLButtonElement | null
    expect(copyButton).toBeTruthy()
    await copyButton?.click()
    await flushPromises()
    await nextTick()

    const vm = wrapper.vm as unknown as { isOpen: boolean }
    expect(vm.isOpen).toBe(false)
  })

  it('closes dialog via the close button action', async () => {
    const wrapper = mount(VersionDialog, {
      props: { version: 'v4.0.0' },
      global: { plugins: [i18n] },
    })
    mountedWrappers.push(wrapper)

    await wrapper.find('button').trigger('click')
    await flushPromises()

    const closeLabel = i18n.global.t('component.versionDialog.close')
    const closeButton = Array.from(document.querySelectorAll('button')).find((btn) =>
      btn.textContent?.includes(closeLabel),
    )
    expect(closeButton).toBeTruthy()
    await closeButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushPromises()
    await nextTick()

    const vm = wrapper.vm as unknown as { isOpen: boolean }
    expect(vm.isOpen).toBe(false)
  })
})
