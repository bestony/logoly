import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import FooterMenu from '../components/FooterMenu.vue'
import { createTestRouter } from './test-utils'

describe('FooterMenu', () => {
  it('renders categories and items', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(FooterMenu, {
      global: { plugins: [router] },
    })

    const categoryTitles = wrapper.findAll('h3').map((title) => title.text())
    expect(categoryTitles).toEqual(['网站', '品牌'])

    const websiteButtons = wrapper
      .findAll('button')
      .slice(0, 4)
      .map((btn) => btn.text())
    expect(websiteButtons).toEqual(['PornHub', 'Vertical PH', 'OnlyFans', 'Simpletext'])
  })

  it('routes when an item is clicked', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const pushSpy = vi.spyOn(router, 'push')

    const wrapper = mount(FooterMenu, {
      global: { plugins: [router] },
    })

    const segaButton = wrapper.findAll('button').find((btn) => btn.text() === 'SEGA')
    expect(segaButton).toBeTruthy()
    await segaButton?.trigger('click')
    await flushPromises()

    expect(pushSpy).toHaveBeenCalledWith('/sega')
  })
})
