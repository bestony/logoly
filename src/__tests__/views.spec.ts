import { mount } from '@vue/test-utils'
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
  { component: OnlyFans, title: 'OnlyFans' },
  { component: About, title: () => i18n.global.t('page.about.title') },
  { component: FAQ, title: () => i18n.global.t('page.faq.title') },
  { component: FedEx, title: 'FedEx' },
  { component: Mastercard, title: 'Mastercard' },
  { component: Bluesnap, title: 'Bluesnap' },
  { component: SimpleText, title: 'Simple Text' },
  { component: SEGA, title: 'SEGA' },
  { component: Nintendo, title: 'Nintendo' },
  { component: Lego, title: 'Lego' },
  { component: Marvel, title: 'Marvel' },
  { component: Bravo, title: 'Bravo' },
  { component: AMC, title: 'AMC' },
]

describe('Static views', () => {
  beforeAll(() => {
    i18n.global.locale.value = 'zh-CN'
  })

  it.each(cases)('renders %s heading', ({ component, title }) => {
    const wrapper = mount(component, {
      global: {
        plugins: [i18n],
      },
    })
    expect(wrapper.find('h1').text()).toBe(resolveTitle(title))
  })
})
