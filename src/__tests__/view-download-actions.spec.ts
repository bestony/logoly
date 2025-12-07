import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import HomeView from '../views/Home.vue'
import SimpleTextView from '../views/SimpleText.vue'
import VerticalPhView from '../views/VerticalPh.vue'
import { i18n } from '../i18n'

const singleSpy = vi.fn()
const zipSpy = vi.fn()

vi.mock('../composables/useSnapshotDownload', () => ({
  useSnapshotDownload: () => ({
    isCanvasReady: ref(true),
    handleSingleDownload: (format: string) => singleSpy(format),
    handleZipDownload: () => zipSpy(),
  }),
}))

describe('View download actions', () => {
  it('wires download buttons in SimpleText view', async () => {
    singleSpy.mockClear()
    zipSpy.mockClear()

    const wrapper = mount(SimpleTextView, {
      global: {
        plugins: [i18n],
        stubs: {
          SimpleTextEditor: { template: '<div class="editor-stub" />' },
        },
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click') // png
    await buttons[1].trigger('click') // jpeg
    await buttons[2].trigger('click') // svg
    await buttons[3].trigger('click') // zip

    expect(singleSpy).toHaveBeenNthCalledWith(1, 'png')
    expect(singleSpy).toHaveBeenNthCalledWith(2, 'jpeg')
    expect(singleSpy).toHaveBeenNthCalledWith(3, 'svg')
    expect(zipSpy).toHaveBeenCalledTimes(1)
  })

  it('wires download buttons in VerticalPh view', async () => {
    singleSpy.mockClear()
    zipSpy.mockClear()

    const wrapper = mount(VerticalPhView, {
      global: {
        plugins: [i18n],
        stubs: {
          VerticalPhLogo: { template: '<div class="logo-stub" />' },
        },
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')
    await buttons[2].trigger('click')
    await buttons[3].trigger('click')

    expect(singleSpy).toHaveBeenNthCalledWith(1, 'png')
    expect(singleSpy).toHaveBeenNthCalledWith(2, 'jpeg')
    expect(singleSpy).toHaveBeenNthCalledWith(3, 'svg')
    expect(zipSpy).toHaveBeenCalledTimes(1)
  })

  it('disables actions and shows errors when SimpleText download is busy', async () => {
    const wrapper = mount(SimpleTextView, {
      global: {
        plugins: [i18n],
        stubs: {
          SimpleTextEditor: { template: '<div class="editor-stub" />' },
        },
      },
    })

    ;(wrapper.vm as any).isDownloading = true
    ;(wrapper.vm as any).errorMessage = 'boom'
    await wrapper.vm.$nextTick()

    wrapper.findAll('button').forEach((btn) => {
      expect(btn.attributes('disabled')).toBeDefined()
    })
    expect(wrapper.find('.text-red-400').text()).toBe('boom')
  })

  it('disables actions and surfaces errors in Home view', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [i18n],
        stubs: {
          PornHub: { template: '<div class="logo-stub" />' },
        },
      },
    })

    ;(wrapper.vm as any).isDownloading = true
    ;(wrapper.vm as any).errorMessage = 'home error'
    await wrapper.vm.$nextTick()

    wrapper.findAll('button').forEach((btn) => {
      expect(btn.attributes('disabled')).toBeDefined()
    })
    expect(wrapper.find('.text-red-400').text()).toBe('home error')
  })

  it('disables actions and shows errors for VerticalPh view as well', async () => {
    const wrapper = mount(VerticalPhView, {
      global: {
        plugins: [i18n],
        stubs: {
          VerticalPhLogo: { template: '<div class="logo-stub" />' },
        },
      },
    })

    ;(wrapper.vm as any).isDownloading = true
    ;(wrapper.vm as any).errorMessage = 'failed'
    await wrapper.vm.$nextTick()

    wrapper.findAll('button').forEach((btn) => {
      expect(btn.attributes('disabled')).toBeDefined()
    })
    expect(wrapper.find('.text-red-400').text()).toBe('failed')
  })
})
