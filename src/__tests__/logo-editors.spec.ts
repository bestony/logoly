import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PornHubLogo from '../components/LogoEditor/PornHub.vue'
import SimpleTextLogo from '../components/LogoEditor/SimpleText.vue'
import { i18n } from '../i18n'

const fontPickerStub = {
  name: 'FontPicker',
  emits: ['update:modelValue', 'update:variant', 'font-change'],
  template: '<div class="font-picker-stub" />',
}

describe('Logo editors', () => {
  it('exercises inputs and options in the PornHub logo editor', async () => {
    const wrapper = mount(PornHubLogo, {
      global: {
        plugins: [i18n],
        stubs: { FontPicker: fontPickerStub },
      },
    })
    await flushPromises()

    const picker = wrapper.findComponent({ name: 'FontPicker' })
    picker.vm.$emit('update:modelValue', 'Inter Tight')
    picker.vm.$emit('update:variant', 'regular')
    await flushPromises()

    const left = wrapper.find('.left-text')
    const right = wrapper.find('.right-text')
    left.element.textContent = 'Left'
    right.element.textContent = 'Right'
    await left.trigger('input')
    await right.trigger('input')

    const range = wrapper.find('input[aria-label="font-size"]')
    await range.setValue(90)

    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    for (const box of checkboxes) {
      await box.setValue(!(box.element as HTMLInputElement).checked)
    }

    const colors = wrapper.findAll('input[type="color"]')
    for (const color of colors) {
      await color.setValue('#abcdef')
    }

    const vm = wrapper.vm as {
      handleFontChange: (payload: { family: string; variant: string }) => void
      fontFamily: string
      fontVariant: string
      isTransparentBg: boolean
      getDownloadOptions: (format?: string) => { backgroundColor: string }
      getFileBaseName: () => string
      captureBgColor: string
      previewCardStyle: Record<string, string>
    }

    vm.handleFontChange({ family: 'Inter', variant: '700italic' })
    expect(vm.fontFamily).toBe('Inter')
    expect(vm.fontVariant).toBe('700italic')
    vm.isTransparentBg = true
    expect(vm.getDownloadOptions('png').backgroundColor).toBe('transparent')
    vm.isTransparentBg = false
    expect(vm.getDownloadOptions('jpeg').backgroundColor).toBe('#000000')
    const canvasBgInput = wrapper.findAll('input[type="color"]').at(-1)
    vm.isTransparentBg = false
    await canvasBgInput?.setValue('#010203')
    expect(vm.previewCardStyle.background).toBeDefined()
    expect(vm.getFileBaseName()).toBe('LeftRight')
  })

  it('covers inline edits and variant parsing in the SimpleText editor', async () => {
    const wrapper = mount(SimpleTextLogo, {
      global: {
        plugins: [i18n],
        stubs: { FontPicker: fontPickerStub },
      },
    })
    await flushPromises()

    const editable = wrapper.find('[contenteditable="true"]')
    editable.element.textContent = 'Hello Simple'
    await editable.trigger('input')

    const colorInputs = wrapper.findAll('input[type="color"]')
    for (const color of colorInputs) {
      await color.setValue('#112233')
    }

    const sizeRange = wrapper.find('input[type="range"]')
    await sizeRange.setValue(72)

    const transparentToggle = wrapper.find('input[type="checkbox"]')
    await transparentToggle.setValue(true)

    const vm = wrapper.vm as {
      handleFontChange: (payload: { family: string; variant: string }) => void
      fontVariant: string
      previewStyle: Record<string, string>
      getFileBaseName: () => string
      getDownloadOptions: (format?: string) => { backgroundColor: string }
    }

    vm.handleFontChange({ family: 'DM Sans', variant: 'italic' })
    expect(vm.fontVariant).toBe('italic')
    expect(vm.previewStyle.fontStyle).toBe('italic')

    vm.handleFontChange({ family: 'DM Sans', variant: '700italic' })
    expect(vm.previewStyle.fontStyle).toBe('italic')
    expect(vm.previewStyle.fontWeight).toBe('700')

    editable.element.textContent = ''
    await editable.trigger('input')
    expect(vm.getFileBaseName()).toBe('Simple-Text')

    editable.element.textContent = 'Hello Simple'
    await editable.trigger('input')
    expect(vm.getFileBaseName()).toBe('Hello-Simple')
    expect(vm.getDownloadOptions('jpeg').backgroundColor).toBe('#112233')
    expect(vm.getDownloadOptions('png').backgroundColor).toBe('transparent')
  })
})
