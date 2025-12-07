import { RouterLinkStub, mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'
import { i18n } from '../i18n'
import About from '../views/About.vue'
import AMC from '../views/AMC.vue'
import Bluesnap from '../views/Bluesnap.vue'
import Bravo from '../views/Bravo.vue'
import FAQ from '../views/FAQ.vue'
import FedEx from '../views/FedEx.vue'
import Home from '../views/Home.vue'
import Lego from '../views/Lego.vue'
import Marvel from '../views/Marvel.vue'
import Mastercard from '../views/Mastercard.vue'
import Nintendo from '../views/Nintendo.vue'
import OnlyFans from '../views/OnlyFans.vue'
import SEGA from '../views/SEGA.vue'
import SimpleText from '../views/SimpleText.vue'
import VerticalPh from '../views/VerticalPh.vue'

type ViewCase = {
  component: object
  title: string | (() => string)
}

const resolveTitle = (title: ViewCase['title']) => (typeof title === 'function' ? title() : title)

const cases: ViewCase[] = [
  { component: Home, title: () => i18n.global.t('page.home.title') },
  { component: VerticalPh, title: () => i18n.global.t('page.verticalPh.title') },
  { component: OnlyFans, title: () => i18n.global.t('page.onlyfans.title') },
  { component: About, title: () => i18n.global.t('page.about.title') },
  { component: FAQ, title: () => i18n.global.t('page.faq.title') },
  { component: FedEx, title: () => i18n.global.t('page.fedex.title') },
  { component: Mastercard, title: () => i18n.global.t('page.mastercard.title') },
  { component: Bluesnap, title: () => i18n.global.t('page.bluesnap.title') },
  { component: SimpleText, title: 'Simple Text' },
  { component: SEGA, title: () => i18n.global.t('page.sega.title') },
  { component: Nintendo, title: () => i18n.global.t('page.nintendo.title') },
  { component: Lego, title: () => i18n.global.t('page.lego.title') },
  { component: Marvel, title: () => i18n.global.t('page.marvel.title') },
  { component: Bravo, title: () => i18n.global.t('page.bravo.title') },
  { component: AMC, title: () => i18n.global.t('page.amc.title') },
]

describe('Static views', () => {
  beforeAll(() => {
    i18n.global.locale.value = 'zh-CN'
  })

  it.each(cases)('renders %s heading', ({ component, title }) => {
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
