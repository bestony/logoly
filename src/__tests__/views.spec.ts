import { RouterLinkStub, mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'
import { i18n } from '../i18n'
import { createTestRouter } from './test-utils'
import About from '../views/About.vue'
import BrandPlaceholder from '../views/BrandPlaceholder.vue'
import FAQ from '../views/FAQ.vue'
import Home from '../views/Home.vue'
import SimpleText from '../views/SimpleText.vue'
import VerticalPh from '../views/VerticalPh.vue'

type ViewCase = {
  component: object
  title: string | (() => string)
}

const resolveTitle = (title: ViewCase['title']) => (typeof title === 'function' ? title() : title)

const primaryCases: ViewCase[] = [
  { component: Home, title: () => i18n.global.t('page.home.title') },
  { component: VerticalPh, title: () => i18n.global.t('page.verticalPh.title') },
  { component: About, title: () => i18n.global.t('page.about.title') },
  { component: FAQ, title: () => i18n.global.t('page.faq.title') },
  { component: SimpleText, title: () => i18n.global.t('page.simpleText.title') },
]

describe('Static views', () => {
  beforeAll(() => {
    i18n.global.locale.value = 'zh-CN'
  })

  it.each(primaryCases)('renders %s heading', ({ component, title }) => {
    const wrapper = mount(component, {
      global: {
        plugins: [i18n],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
    expect(wrapper.find('h1').text()).toBe(resolveTitle(title))
  })
})

describe('Brand placeholder views', () => {
  beforeAll(() => {
    i18n.global.locale.value = 'zh-CN'
  })

  it.each([
    ['/onlyfans', 'page.onlyfans.title'],
    ['/fedex', 'page.fedex.title'],
    ['/mastercard', 'page.mastercard.title'],
    ['/bluesnap', 'page.bluesnap.title'],
    ['/sega', 'page.sega.title'],
    ['/nintendo', 'page.nintendo.title'],
    ['/lego', 'page.lego.title'],
    ['/marvel', 'page.marvel.title'],
    ['/bravo', 'page.bravo.title'],
    ['/amc', 'page.amc.title'],
  ])('renders %s heading', async (path, key) => {
    const router = createTestRouter()
    await router.push(path)
    await router.isReady()

    const wrapper = mount(BrandPlaceholder, {
      global: {
        plugins: [i18n, router],
      },
    })

    expect(wrapper.find('h1').text()).toBe(i18n.global.t(key))
  })

  it('falls back to route name and defaults when meta is missing', async () => {
    const router = createTestRouter()
    router.addRoute({ path: '/custom', name: 'custom', component: BrandPlaceholder })
    await router.push('/custom')
    await router.isReady()

    const wrapper = mount(BrandPlaceholder, {
      global: {
        plugins: [i18n, router],
        stubs: {
          UnderConstruction: {
            props: ['baseKey', 'brandLabel', 'progressHref'],
            template:
              '<div><span class="base">{{ baseKey }}</span><span class="brand">{{ brandLabel }}</span><span class="progress">{{ progressHref }}</span></div>',
          },
        },
      },
    })

    expect(wrapper.find('.base').text()).toBe('page.custom')
    expect(wrapper.find('.brand').text()).toBe('Logoly')
    expect(wrapper.find('.progress').text()).toBe('')
  })

  it('passes through progress links when provided', async () => {
    const router = createTestRouter()
    router.addRoute({
      path: '/progress',
      name: 'progress',
      component: BrandPlaceholder,
      meta: { progressHref: 'https://example.com/progress' },
    })
    await router.push('/progress')
    await router.isReady()

    const wrapper = mount(BrandPlaceholder, {
      global: {
        plugins: [i18n, router],
        stubs: {
          UnderConstruction: {
            props: ['baseKey', 'brandLabel', 'progressHref'],
            template:
              '<div><span class="progress">{{ progressHref }}</span><span class="base">{{ baseKey }}</span><span class="brand">{{ brandLabel }}</span></div>',
          },
        },
      },
    })

    expect(wrapper.find('.progress').text()).toBe('https://example.com/progress')
    expect(wrapper.find('.base').text()).toBe('page.progress')
    expect(wrapper.find('.brand').text()).toBe('Logoly')
  })

  it('uses meta title as brand label fallback when brandLabel is missing', async () => {
    const router = createTestRouter()
    router.addRoute({
      path: '/with-title',
      name: 'with-title',
      component: BrandPlaceholder,
      meta: { title: 'Titled Brand' },
    })
    await router.push('/with-title')
    await router.isReady()

    const wrapper = mount(BrandPlaceholder, {
      global: {
        plugins: [i18n, router],
        stubs: {
          UnderConstruction: {
            props: ['baseKey', 'brandLabel'],
            template: '<div class="brand">{{ brandLabel }}-{{ baseKey }}</div>',
          },
        },
      },
    })

    expect(wrapper.find('.brand').text()).toBe('Titled Brand-page.with-title')
  })

  it('defaults placeholder base key to home when route name is missing', async () => {
    const router = createTestRouter()
    router.addRoute({
      path: '/anon',
      component: BrandPlaceholder,
    })
    await router.push('/anon')
    await router.isReady()

    const wrapper = mount(BrandPlaceholder, {
      global: {
        plugins: [i18n, router],
        stubs: {
          UnderConstruction: {
            props: ['baseKey'],
            template: '<div class="base">{{ baseKey }}</div>',
          },
        },
      },
    })

    expect(wrapper.find('.base').text()).toBe('page.home')
  })
})
