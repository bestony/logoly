import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import VersionDialog from '../components/VersionDialog.vue'

describe('VersionDialog', () => {
  it('opens dialog and copies debug info, then closes', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    const resizeObserverMock: typeof ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
    // biome-ignore lint/style/useNamingConvention: DOM global name
    ;(globalThis as typeof globalThis & { ResizeObserver: typeof ResizeObserver }).ResizeObserver =
      resizeObserverMock

    const wrapper = mount(VersionDialog, {
      props: { version: 'v1.0.0-test' },
    })

    expect(wrapper.text()).toContain('v1.0.0-test')

    await wrapper.find('button').trigger('click')
    await flushPromises()

    expect(document.body.innerHTML).toContain('Click to Copy Debug Info')

    const copyButton = document.querySelector(
      '[data-testid="copy-debug"]',
    ) as HTMLButtonElement | null
    expect(copyButton).toBeTruthy()
    if (!copyButton) throw new Error('copy debug button not found')

    await copyButton.click()
    await flushPromises()

    expect(writeText).toHaveBeenCalledTimes(1)
    const copiedText = writeText.mock.calls[0]?.[0]
    expect(copiedText).toContain('Version: v1.0.0-test')
    await flushPromises()
    expect(document.body.innerHTML).not.toContain('Click to Copy Debug Info')
  })
})
