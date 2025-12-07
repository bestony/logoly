import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import { useLogoEditor } from '../composables/useLogoEditor'

const createEditor = (options = {}) => {
  let editorApi: ReturnType<typeof useLogoEditor>
  const Harness = defineComponent({
    setup() {
      editorApi = useLogoEditor(options)
      return { editor: editorApi }
    },
    template: '<div />',
  })

  const wrapper = mount(Harness)
  return { editor: editorApi!, wrapper }
}

describe('useLogoEditor', () => {
  it('toggles left background visibility while remembering the last color', () => {
    const { editor } = createEditor()

    editor.leftBgColor.value = '#222222'
    editor.isLeftBgVisible.value = false
    expect(editor.leftBgColor.value).toBe('transparent')

    editor.isLeftBgVisible.value = true
    expect(editor.leftBgColor.value).toBe('#222222')

    editor.leftBgColor.value = 'transparent'
    editor.isLeftBgVisible.value = false
    expect(editor.leftBgColor.value).toBe('transparent')
  })

  it('computes download options and backgrounds for transparent and jpeg cases', () => {
    const { editor } = createEditor({ initialFontSize: 72 })

    editor.previewBgColor.value = '#123456'
    editor.isTransparentBg.value = true

    expect(editor.getDownloadOptions('png')).toMatchObject({
      backgroundColor: 'transparent',
      pixelRatio: 2,
      quality: 0.92,
    })

    expect(editor.captureBgColor.value).toBe('transparent')

    editor.isTransparentBg.value = false
    expect(editor.getDownloadOptions('jpeg')).toMatchObject({
      backgroundColor: '#123456',
      quality: 0.92,
    })
  })

  it('derives preview card styling based on flags and user input', () => {
    const { editor } = createEditor()

    editor.isPureBlackPreview.value = true
    expect(editor.previewCardStyle.value.background).toBe('#000000')

    editor.isTransparentBg.value = true
    expect(editor.previewCardStyle.value.background).toBe('transparent')

    editor.isTransparentBg.value = false
    editor.isPureBlackPreview.value = false
    editor.previewBgColor.value = '#0f0f0f'
    expect(editor.previewCardStyle.value.background).toBe('#0f0f0f')
  })

  it('reads editable text content to build sanitized filenames', () => {
    const { editor } = createEditor({ initialLeft: 'Hello', initialRight: 'World' })

    const leftEl = document.createElement('span')
    leftEl.textContent = 'Left /'
    const rightEl = document.createElement('span')
    rightEl.textContent = 'Right:'

    editor.leftEl.value = leftEl
    editor.rightEl.value = rightEl

    expect(editor.getFileBaseName()).toBe('Left-Right')

    editor.leftEl.value = null
    editor.rightEl.value = null
    editor.leftText.value = '   '
    editor.rightText.value = ''
    expect(editor.getFileBaseName()).toBe('logoly')

    editor.leftText.value = undefined as unknown as string
    editor.rightText.value = undefined as unknown as string
    expect(editor.getFileBaseName()).toBe('logoly')
  })

  it('handles font changes and inline edits for both segments', () => {
    const { editor } = createEditor()

    editor.handleFontChange({ family: 'Inter', variant: '700italic' })
    expect(editor.fontFamily.value).toBe('Inter')
    expect(editor.fontVariant.value).toBe('700italic')

    const leftInput = new Event('input')
    Object.defineProperty(leftInput, 'target', {
      value: { textContent: 'NewLeft' },
    })
    editor.onLeftInput(leftInput)

    const rightInput = new Event('input')
    Object.defineProperty(rightInput, 'target', {
      value: { textContent: 'NewRight' },
    })
    editor.onRightInput(rightInput)

    expect(editor.leftText.value).toBe('NewLeft')
    expect(editor.rightText.value).toBe('NewRight')

    editor.onLeftInput({ target: null } as unknown as Event)
    editor.onRightInput({} as unknown as Event)
    expect(editor.leftText.value).toBe('')
    expect(editor.rightText.value).toBe('')
  })

  it('syncs initial DOM content on mount', async () => {
    const Comp = defineComponent({
      setup() {
        const editor = useLogoEditor({ initialLeft: 'LeftStart', initialRight: 'RightStart' })
        const setLeft = (el: HTMLElement | null) => {
          editor.leftEl.value = el
        }
        const setRight = (el: HTMLElement | null) => {
          editor.rightEl.value = el
        }
        return { editor, setLeft, setRight }
      },
      template: `<div><span :ref="setLeft"></span><span :ref="setRight"></span></div>`,
    })

    const wrapper = mount(Comp)
    await nextTick()

    const spans = wrapper.findAll('span')
    expect(spans[0]?.text()).toBe('LeftStart')
    expect(spans[1]?.text()).toBe('RightStart')
  })
})
