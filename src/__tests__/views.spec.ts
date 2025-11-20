import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
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
  title: string
}

const cases: ViewCase[] = [
  { component: Home, title: '首页' },
  { component: VerticalPh, title: 'Vertical PH' },
  { component: OnlyFans, title: 'OnlyFans' },
  { component: About, title: '关于我们' },
  { component: FAQ, title: '常见问题' },
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
  it.each(cases)('renders %s heading', ({ component, title }) => {
    const wrapper = mount(component)
    expect(wrapper.find('h1').text()).toBe(title)
  })
})
