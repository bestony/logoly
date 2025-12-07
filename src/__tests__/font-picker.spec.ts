import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import FontPicker from '../components/FontPicker.vue'
import { i18n } from '../i18n'

const fontsPayload = [
  {
    family: 'Inter',
    variants: ['regular', '700italic'],
    files: {
      regular: 'https://fonts.example.com/inter-regular.woff2',
      '700italic': 'https://fonts.example.com/inter-700italic.ttf',
      italic: 'https://fonts.example.com/inter-italic.woff',
    },
    category: 'sans-serif',
  },
  {
    family: 'Roboto Flex',
    variants: ['variable'],
    files: {
      variable: 'https://fonts.example.com/roboto-flex-variable.woff2',
    },
    category: 'sans-serif',
  },
  {
    family: 'Broken',
    variants: ['regular'],
    files: {},
    category: 'display',
  },
]

const fontInstances: Array<{ family: string; source: string; descriptors: FontFaceDescriptors }> = []
const addSpy = vi.fn()
const loadSpy = vi.fn()
let fetchMock: ReturnType<typeof vi.fn>

class FakeFontFace {
  family: string
  source: string
  descriptors: FontFaceDescriptors
  constructor(family: string, source: string, descriptors: FontFaceDescriptors) {
    this.family = family
    this.source = source
    this.descriptors = descriptors
    fontInstances.push({ family, source, descriptors })
  }

  load = loadSpy
}

const originalFetch = global.fetch

const mountPicker = async () => {
  const wrapper = mount(FontPicker, {
    global: {
      plugins: [i18n],
      stubs: {
        Multiselect: {
          name: 'Multiselect',
          props: ['modelValue', 'options'],
          emits: ['update:modelValue'],
          mounted() {
            const first =
              (this as any).options?.[0]?.fonts?.[0] ??
              (this as any).options?.[0] ??
              { label: 'Inter', value: 'Inter' }
            this.$emit('update:modelValue', first)
          },
          template: '<div class="multiselect-stub" />',
        },
      },
    },
  })

  await flushPromises()
  return wrapper
}

beforeEach(() => {
  fontInstances.length = 0
  addSpy.mockClear()
  loadSpy.mockClear()

  vi.stubGlobal('FontFace', FakeFontFace as unknown as typeof FontFace)
  Object.defineProperty(document, 'fonts', { value: { add: addSpy }, configurable: true })

  fetchMock = vi.fn(async (url: RequestInfo | URL) => {
    if (url.toString().includes('/api/fonts')) {
      return {
        ok: true,
        json: async () => ({ items: fontsPayload }),
      } as Response
    }
    return originalFetch(url)
  })

  global.fetch = fetchMock as unknown as typeof fetch
})

afterEach(() => {
  vi.unstubAllGlobals()
  global.fetch = originalFetch
})

describe('FontPicker', () => {
  it('fetches fonts and loads the first variant on mount', async () => {
    const wrapper = await mountPicker()

    expect(fetchMock.mock.calls[0]?.[0].toString()).toContain('/api/fonts')
    expect((wrapper.vm as { selectedFamily: string }).selectedFamily).toBe('Inter')

    await flushPromises()

    expect((wrapper.vm as { fontCountLabel: string }).fontCountLabel).toBe(
      i18n.global.t('component.fontPicker.count', { count: fontsPayload.length }),
    )
    expect(loadSpy).toHaveBeenCalled()
    expect(addSpy).toHaveBeenCalled()
    expect(fontInstances[0]?.source).toContain('inter-regular.woff2')
    expect(fontInstances[0]?.descriptors.weight).toBe('400')

    const emitted = wrapper.emitted('font-change')?.[0]
    expect(emitted).toEqual([{ family: 'Inter', variant: 'regular' }])
  })

  it('switches variants and reuses cached fonts without reloading', async () => {
    const wrapper = await mountPicker()
    const vm = wrapper.vm as { selectedFamily: string; selectedVariant: string; loadFont: Function }

    vm.selectedFamily = 'Inter'
    vm.selectedVariant = '700italic'
    await flushPromises()

    expect(fontInstances.at(-1)?.descriptors.style).toBe('italic')
    expect(fontInstances.at(-1)?.descriptors.weight).toBe('700')

    const loadedCalls = loadSpy.mock.calls.length
    await vm.loadFont('Inter', '700italic')
    expect(loadSpy.mock.calls.length).toBe(loadedCalls)

    const lastEmission = wrapper.emitted('font-change')?.at(-1)
    expect(lastEmission).toEqual([{ family: 'Inter', variant: '700italic' }])
  })

  it('loads variable fonts and surfaces errors when files are missing', async () => {
    const wrapper = await mountPicker()
    const vm = wrapper.vm as { selectedFamily: string; selectedVariant: string; loadFont: Function; error: string | null }

    vm.selectedFamily = 'Roboto Flex'
    vm.selectedVariant = 'variable'
    await flushPromises()

    expect(fontInstances.at(-1)?.source).toContain('roboto-flex-variable.woff2')
    expect(fontInstances.at(-1)?.descriptors.weight).toBe('100 900')

    const callsBeforeError = loadSpy.mock.calls.length

    vm.selectedFamily = 'Broken'
    vm.selectedVariant = 'regular'
    await vm.loadFont('Broken', 'regular')

    expect(vm.error).toBe(i18n.global.t('component.fontPicker.fetchError'))
    expect(loadSpy.mock.calls.length).toBe(callsBeforeError)
  })

  it('resets variants when unavailable and skips loading when font is missing', async () => {
    const wrapper = await mountPicker()
    const vm = wrapper.vm as { selectedFamily: string; selectedVariant: string; loadFont: Function }

    vm.selectedVariant = 'unknown'
    vm.selectedFamily = 'Roboto Flex'
    await flushPromises()

    expect(vm.selectedVariant).toBe('variable')

    const callsBefore = loadSpy.mock.calls.length
    vm.selectedFamily = 'Ghost'
    await vm.loadFont('Ghost', 'regular')
    expect(loadSpy.mock.calls.length).toBe(callsBefore)
  })

  it('covers helper branches and reports errors when fetch or font loading fails', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as Response)

    const wrapper = await mountPicker()
    const vm = wrapper.vm as { detectFormat: (url: string) => string; parseVariantMeta: (v: string) => { style: string; weight: string }; error: string | null; loadFont: Function; selectedFamily: string; selectedVariant: string }

    await flushPromises()
    expect(vm.error).toBe(i18n.global.t('component.fontPicker.fetchError'))

    expect(vm.detectFormat('font.woff')).toBe('woff')
    expect(vm.detectFormat('font.otf')).toBe('opentype')
    expect(vm.parseVariantMeta('italic')).toEqual({ style: 'italic', weight: '400' })
    expect(vm.parseVariantMeta('900')).toEqual({ style: 'normal', weight: '900' })

    vm.selectedFamily = 'Inter'
    vm.selectedVariant = 'italic'
    loadSpy.mockRejectedValueOnce(new Error('boom'))
    await vm.loadFont('Inter', 'italic')

    expect(vm.error).toBe(i18n.global.t('component.fontPicker.fetchError'))
  })

  it('adds missing variable and regular variants based on available files', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          {
            family: 'Flexy',
            variants: ['300'],
            files: {
              variable: 'https://fonts.example.com/flexy-variable.woff2',
              regular: 'https://fonts.example.com/flexy-regular.woff',
            },
            category: 'display',
          },
        ],
      }),
    } as Response)

    const wrapper = await mountPicker()
    const vm = wrapper.vm as { selectedFamily: string; variantOptions: string[] }

    vm.selectedFamily = 'Flexy'
    await flushPromises()

    expect(vm.variantOptions.slice(0, 3)).toEqual(['regular', 'variable', '300'])
  })

  it('syncs props into internal state and exposes grouped options/selectors', async () => {
    const wrapper = await mountPicker()
    const vm = wrapper.vm as {
      groupedOptions: Array<{ category: string }>
      selectedOption: { label: string; value: string } | null
      selectedFamily: string
      selectedVariant: string
      onOptionChange: (option: { label: string; value: string }) => void
    }

    expect(vm.groupedOptions.length).toBeGreaterThan(0)
    expect(vm.selectedOption?.value).toBe(vm.selectedFamily)

    await wrapper.setProps({ modelValue: 'Roboto Flex', variant: 'variable' })
    await flushPromises()

    expect(vm.selectedFamily).toBe('Roboto Flex')
    expect(vm.selectedVariant).toBe('variable')

    vm.selectedOption = { label: 'Inter', value: 'Inter' }
    expect(vm.selectedFamily).toBe('Inter')
    vm.onOptionChange({ label: 'Roboto Flex', value: 'Roboto Flex' })
    expect(vm.selectedFamily).toBe('Roboto Flex')
  })

  it('resets the selected variant when the current font no longer exposes it', async () => {
    const wrapper = await mountPicker()
    const vm = wrapper.vm as { selectedVariant: string }

    await wrapper.setProps({ modelValue: 'Roboto Flex', variant: 'thin' })
    await flushPromises()

    expect(vm.selectedVariant).toBe('variable')
  })

  it('handles empty API payloads without crashing and keeps graceful defaults', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as Response)

    const wrapper = await mountPicker()
    const vm = wrapper.vm as { groupedOptions: Array<{ category: string }>; variantOptions: string[] }
    await flushPromises()

    expect(vm.groupedOptions.length).toBe(0)
    expect(vm.variantOptions.length).toBe(0)
    expect(wrapper.find('.fp-error').exists()).toBe(false)
  })

  it('falls back to Other category and resets variants when options mismatch', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          {
            family: 'Mystery',
            variants: ['regular'],
            files: { regular: 'https://fonts.example.com/mystery.woff2' },
          },
        ],
      }),
    } as Response)

    const wrapper = await mountPicker()
    await flushPromises()
    const vm = wrapper.vm as {
      groupedOptions: Array<{ category: string }>
      selectedOption: { label: string; value: string } | null
      selectedFamily: string
      selectedVariant: string
    }

    vm.selectedVariant = 'bold-900'
    vm.selectedFamily = ''
    await flushPromises()

    vm.selectedFamily = 'Mystery'
    await flushPromises()
    await wrapper.vm.$nextTick()

    expect(vm.groupedOptions[0]?.category).toBe('OTHER')
    expect(vm.selectedVariant).toBe('regular')

    vm.selectedOption = null
    expect(vm.selectedFamily).toBe('')
  })
})
