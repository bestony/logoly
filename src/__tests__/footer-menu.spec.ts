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
      .map((btn) => btn.find('span').text())
    expect(websiteButtons).toEqual([
      i18n.global.t('component.menu.home'),
      i18n.global.t('component.menu.verticalPh'),
      i18n.global.t('component.menu.onlyfans'),
      i18n.global.t('component.menu.simpleText'),
    ])
  })

  it('shows building badges on under-construction items', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(FooterMenu, {
      global: { plugins: [router, i18n] },
    })

    const buildingBadge = i18n.global.t('component.menu.badge.building')
    const buildingLabels = [
      'component.menu.onlyfans',
      'component.menu.fedex',
      'component.menu.mastercard',
      'component.menu.bluesnap',
      'component.menu.sega',
      'component.menu.nintendo',
      'component.menu.lego',
      'component.menu.marvel',
      'component.menu.bravo',
      'component.menu.amc',
    ].map((key) => i18n.global.t(key))

    const buttons = wrapper.findAll('button')
    const buttonsWithBadge = buttons.filter((btn) => btn.text().includes(buildingBadge))

    expect(buttonsWithBadge).toHaveLength(buildingLabels.length)
    buildingLabels.forEach((label) => {
      const button = buttons.find((btn) => btn.text().includes(label))
      expect(button?.text()).toContain(buildingBadge)
    })
  })

  it('routes when an item is clicked', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const pushSpy = vi.spyOn(router, 'push')

    const wrapper = mount(FooterMenu, {
      global: { plugins: [router, i18n] },
    })

    const segaButton = wrapper
      .findAll('button')
      .find((btn) => btn.find('span').text() === i18n.global.t('component.menu.sega'))
    expect(segaButton).toBeTruthy()
    await segaButton?.trigger('click')
    await flushPromises()

    expect(pushSpy).toHaveBeenCalledWith('/sega')
  })
})
