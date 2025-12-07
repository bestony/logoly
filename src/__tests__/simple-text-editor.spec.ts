import { mount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import SimpleTextEditor from '../components/LogoEditor/SimpleText.vue'
import { i18n } from '../i18n'

const mountEditor = () =>
  mount(SimpleTextEditor, {
    global: {
      plugins: [i18n],
      stubs: {
        FontPicker: {
          emits: ['update:modelValue', 'update:variant', 'font-change'],
          template:
            '<div class="font-picker-stub" @click="$emit(\'update:modelValue\', \'StubFont\'); $emit(\'update:variant\', \'italic\')" />',
        },
      },
    },
  })

afterEach(() => {
  i18n.global.locale.value = 'en'
})

describe('SimpleText editor', () => {
  it('sanitizes filenames and adapts download options per format', () => {
    const wrapper = mountEditor()
    const vm = wrapper.vm as unknown as {
      textValue: string
      isTransparentBg: boolean
      previewBgColor: string
      getFileBaseName: () => string
      getDownloadOptions: (format?: string) => { backgroundColor: string; quality: number }
    }

    vm.textValue = '  custom /logo*name  '

    expect(vm.getFileBaseName()).toBe('custom-logoname')
    expect(vm.activeFontFamily).toContain('Inter')

    vm.isTransparentBg = true
    expect(vm.getDownloadOptions('png')).toMatchObject({ backgroundColor: 'transparent', quality: 0.94 })
    expect(vm.getDownloadOptions('jpeg')).toMatchObject({ backgroundColor: vm.previewBgColor, quality: 0.92 })

    vm.fontFamily = 'Display Font'
    expect(vm.activeFontFamily).toContain('Display Font')
    expect(vm.previewStyle.fontFamily).toContain('Display Font')
  })

  it('keeps user edits when locale changes after editing', async () => {
    const wrapper = mountEditor()
    const vm = wrapper.vm as unknown as { textValue: string }

    i18n.global.locale.value = 'es'
    await flushPromises()

    const defaultEs = i18n.global.t('page.simpleText.defaultText')
    expect(vm.textValue).toBe(defaultEs)

    const textbox = wrapper.find('[role="textbox"]')
    textbox.element.textContent = 'My Custom Logo'
    await textbox.trigger('input')

    i18n.global.locale.value = 'fr'
    await flushPromises()

    expect(vm.textValue).toBe('My Custom Logo')
  })

  it('updates font metadata and computed styles', async () => {
    const wrapper = mountEditor()
    const vm = wrapper.vm as unknown as {
      fontVariant: string
      fontFamily: string
      variantStyle: { weight: string; style: string }
      previewSurfaceStyle: { background: string }
      previewBgColor: string
      isTransparentBg: boolean
      handleFontChange: (payload: { family: string; variant: string }) => void
    }

    await wrapper.find('.font-picker-stub').trigger('click')
    expect(vm.fontFamily).toBe('StubFont')
    expect(vm.fontVariant).toBe('italic')

    vm.handleFontChange({ family: 'Inter', variant: 'variable' })
    expect(vm.fontVariant).toBe('variable')
    expect(vm.variantStyle).toEqual({ style: 'normal', weight: '400' })

    vm.fontVariant = 'italic'
    await flushPromises()
    expect(vm.variantStyle).toEqual({ style: 'italic', weight: '400' })

    vm.fontVariant = '700italic'
    await flushPromises()
    expect(vm.variantStyle).toEqual({ style: 'italic', weight: '700' })

    vm.fontVariant = '500'
    await flushPromises()
    expect(vm.variantStyle).toEqual({ style: 'normal', weight: '500' })

    expect(vm.previewCardStyle.background).toContain('#1f2937')

    vm.isTransparentBg = true
    await flushPromises()
    expect(vm.previewSurfaceStyle.background).toBe('transparent')

    vm.isTransparentBg = false
    await flushPromises()
    expect(vm.previewSurfaceStyle.background).toBe(vm.previewBgColor)
  })

  it('falls back to default filename and resets text when input is cleared', async () => {
    const wrapper = mountEditor()
    const vm = wrapper.vm as unknown as {
      textValue: string
      getFileBaseName: () => string
      handleInlineInput: (e: Event) => void
    }

    vm.textValue = '     '
    expect(vm.getFileBaseName()).toBe('simple-text')

    vm.handleInlineInput({ target: null } as unknown as Event)
    expect(vm.textValue).toBe('')
    expect(vm.getFileBaseName()).toBe('Simple-Text')
  })
})
