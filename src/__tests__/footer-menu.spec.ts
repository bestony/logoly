import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import FooterMenu from '../components/FooterMenu.vue'
import { i18n } from '../i18n'
import { createTestRouter } from './test-utils'

describe('FooterMenu', () => {
  it('renders categories and items', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(FooterMenu, {
      global: { plugins: [router, i18n] },
    })

    const categoryTitles = wrapper.findAll('h3').map((title) => title.text())
    expect(categoryTitles).toEqual([
      i18n.global.t('component.footerMenu.categories.websites'),
      i18n.global.t('component.footerMenu.categories.brands'),
    ])

    const websiteButtons = wrapper
      .findAll('button')
      .slice(0, 4)
      .map((btn) => btn.text())
    expect(websiteButtons).toEqual([
      i18n.global.t('component.menu.home'),
      i18n.global.t('component.menu.verticalPh'),
      i18n.global.t('component.menu.onlyfans'),
      i18n.global.t('component.menu.simpleText'),
    ])
  })

  it('routes when an item is clicked', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const pushSpy = vi.spyOn(router, 'push')

    const wrapper = mount(FooterMenu, {
      global: { plugins: [router, i18n] },
    })

    const segaButton = wrapper.findAll('button').find((btn) => btn.text() === 'SEGA')
    expect(segaButton).toBeTruthy()
    await segaButton?.trigger('click')
    await flushPromises()

    expect(pushSpy).toHaveBeenCalledWith('/sega')
  })
})
