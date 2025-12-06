import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import Home from '../views/Home.vue'
import { i18n } from '../i18n'
import { downloadAsZip, downloadImage } from '@/utils/download'

vi.mock('@/utils/download', () => ({
  downloadImage: vi.fn(),
  downloadAsZip: vi.fn(),
}))

// Minimal stub to avoid remote font fetch; emits the same events as the real component.
vi.mock('@/components/FontPicker.vue', () => ({
  default: defineComponent({
    name: 'FontPickerStub',
    emits: ['update:modelValue', 'update:variant', 'font-change'],
    template: `
      <div data-testid="font-picker-stub">
        <button
          type="button"
          data-testid="apply-font"
          @click="$emit('update:modelValue', 'Inter'); $emit('update:variant', 'regular'); $emit('font-change', { family: 'Inter', variant: 'regular' })"
        >
          Apply Inter
        </button>
      </div>
    `,
  }),
}))

const getButtonByText = (wrapper: ReturnType<typeof mount>, text: string) =>
  wrapper.findAll('button').find((button) => button.text().includes(text))

describe('PornHub flow (e2e-like)', () => {
  it('changes font, updates colors, and downloads all formats', async () => {
    const downloadImageMock = vi.mocked(downloadImage)
    const downloadAsZipMock = vi.mocked(downloadAsZip)
    downloadImageMock.mockResolvedValue(undefined)
    downloadAsZipMock.mockResolvedValue(undefined)

    const wrapper = mount(Home, {
      global: {
        plugins: [i18n],
      },
    })

    await flushPromises()

    const logo = wrapper.find('.logo-wrapper')
    expect(logo.exists()).toBe(true)

    // Switch font via stubbed picker
    const fontButton = wrapper.find('[data-testid="apply-font"]')
    expect(fontButton.exists()).toBe(true)
    await fontButton.trigger('click')
    await flushPromises()
    expect(logo.element.style.fontFamily).toContain('Inter')

    // Adjust colors
    const colorInputs = wrapper.findAll('input[type="color"]')
    expect(colorInputs.length).toBeGreaterThanOrEqual(4)

    const [leftBgInput, leftColorInput, rightBgInput, rightColorInput] = colorInputs

    await leftBgInput.setValue('#112233')
    await leftColorInput.setValue('#445566')
    await rightBgInput.setValue('#abcdef')
    await rightColorInput.setValue('#123456')

    const leftSpan = wrapper.find('.left-text')
    const rightSpan = wrapper.find('.right-text')

    expect(leftSpan.element.style.backgroundColor).toBe('rgb(17, 34, 51)')
    expect(leftSpan.element.style.color).toBe('rgb(68, 85, 102)')
    expect(rightSpan.element.style.backgroundColor).toBe('rgb(171, 205, 239)')
    expect(rightSpan.element.style.color).toBe('rgb(18, 52, 86)')

    // Trigger downloads
    const pngButton = getButtonByText(wrapper, 'Download PNG')
    const jpgButton = getButtonByText(wrapper, 'Download JPG')
    const svgButton = getButtonByText(wrapper, 'Download SVG')
    const zipButton = getButtonByText(wrapper, 'Download ZIP')

    expect(pngButton && jpgButton && svgButton && zipButton).toBeTruthy()

    await pngButton?.trigger('click')
    await flushPromises()
    await jpgButton?.trigger('click')
    await flushPromises()
    await svgButton?.trigger('click')
    await flushPromises()
    await zipButton?.trigger('click')
    await flushPromises()

    expect(downloadImageMock).toHaveBeenNthCalledWith(
      1,
      expect.any(HTMLElement),
      'png',
      expect.objectContaining({
        baseName: 'logoly-home',
        options: expect.objectContaining({
          backgroundColor: '#000000',
          pixelRatio: 2,
          quality: 0.92,
        }),
      }),
    )

    expect(downloadImageMock).toHaveBeenNthCalledWith(
      2,
      expect.any(HTMLElement),
      'jpeg',
      expect.objectContaining({
        baseName: 'logoly-home',
      }),
    )

    expect(downloadImageMock).toHaveBeenNthCalledWith(
      3,
      expect.any(HTMLElement),
      'svg',
      expect.objectContaining({
        baseName: 'logoly-home',
      }),
    )

    expect(downloadAsZipMock).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      ['png', 'jpeg', 'svg'],
      expect.objectContaining({
        baseName: 'logoly-home',
        options: expect.objectContaining({
          backgroundColor: '#000000',
        }),
      }),
    )
  })
})
