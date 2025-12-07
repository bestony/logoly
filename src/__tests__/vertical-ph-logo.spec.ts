import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import VerticalPhLogo from '../components/LogoEditor/VerticalPh.vue'
import { i18n } from '../i18n'

describe('VerticalPh logo editor', () => {
  const mountLogo = () =>
    mount(VerticalPhLogo, {
      global: {
        plugins: [i18n],
        stubs: {
          FontPicker: {
            name: 'FontPicker',
            emits: ['font-change', 'update:modelValue', 'update:variant'],
            template: '<div class="font-picker-stub" />',
          },
        },
      },
    })

  it('syncs initial content and responds to input events', async () => {
    const wrapper = mountLogo()
    await flushPromises()

    const left = wrapper.find('.left-text')
    const right = wrapper.find('.right-text')

    expect(left.text()).toBe('Edit')
    expect(right.text()).toBe('me')

    const vm = wrapper.vm as {
      getFileBaseName: () => string
      leftText: string
      rightText: string
      onLeftInput: (e: Event) => void
      onRightInput: (e: Event) => void
    }

    left.element.textContent = 'Hello'
    right.element.textContent = 'World'
    await left.trigger('input')
    await right.trigger('input')

    expect(vm.leftText).toBe('Hello')
    expect(vm.rightText).toBe('World')
    expect(vm.getFileBaseName()).toBe('HelloWorld')
  })

  it('handles font changes, background toggles, and download options', async () => {
    const wrapper = mountLogo()
    await flushPromises()

    const picker = wrapper.findComponent({ name: 'FontPicker' })
    picker.vm.$emit('update:modelValue', 'DM Sans')
    picker.vm.$emit('update:variant', 'regular')
    await flushPromises()

    const vm = wrapper.vm as {
      handleFontChange: (p: { family: string; variant: string }) => void
      fontFamily: string
      fontVariant: string
      isLeftBgVisible: boolean
      leftBgColor: string
      previewCardStyle: Record<string, string>
      isTransparentBg: boolean
      isPureBlackPreview: boolean
      getDownloadOptions: (format?: string) => { backgroundColor: string }
      captureBgColor: string
    }

    vm.handleFontChange({ family: 'Inter', variant: 'italic' })
    expect(vm.fontFamily).toBe('Inter')
    expect(vm.fontVariant).toBe('italic')

    vm.leftBgColor = '#123456'
    vm.isLeftBgVisible = false
    expect(vm.leftBgColor).toBe('transparent')
    vm.isLeftBgVisible = true
    expect(vm.leftBgColor).toBe('#123456')

    vm.isTransparentBg = true
    expect(vm.previewCardStyle.background).toBe('transparent')

    vm.isTransparentBg = false
    vm.isPureBlackPreview = true
    expect(vm.captureBgColor).toBe('#000000')
    expect(vm.previewCardStyle.background).toBe('#000000')

    vm.isPureBlackPreview = false
    expect(vm.getDownloadOptions('jpeg').backgroundColor).toBe('#000000')

    await wrapper.find('input[aria-label="font-size"]').setValue(80)
    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    await checkboxes[0]?.setValue(false)
    await checkboxes[0]?.setValue(true)
    const colors = wrapper.findAll('input[type="color"]')
    for (const color of colors) {
      await color.setValue('#123456')
    }

    vm.isTransparentBg = true
    const canvasBgInput = wrapper.findAll('input[type="color"]').at(-1)
    vm.isTransparentBg = false
    await canvasBgInput?.setValue('#654321')
    vm.isTransparentBg = true
    expect(vm.getDownloadOptions('png').backgroundColor).toBe('transparent')
    expect(vm.getFileBaseName().toLowerCase()).toBe('editme')
  })
})
