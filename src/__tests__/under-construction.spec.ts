import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import UnderConstruction from '../components/UnderConstruction.vue'
import { i18n } from '../i18n'

describe('UnderConstruction', () => {
  const mountWithProps = (props: Record<string, unknown>) =>
    mount(UnderConstruction, {
      props,
      global: {
        plugins: [i18n],
        stubs: {
          RouterLink: {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
          },
        },
      },
    })

  it('uses provided brand label and progress link when supplied', () => {
    const wrapper = mountWithProps({
      baseKey: 'page.onlyfans',
      brandLabel: 'Custom Brand',
      progressHref: 'https://example.com/progress',
    })

    expect(wrapper.text()).toContain('Custom Brand')
    const link = wrapper.find('a[href="https://example.com/progress"]')
    expect(link.exists()).toBe(true)
  })

  it('falls back to localized title when brand label is missing', () => {
    const wrapper = mountWithProps({
      baseKey: 'page.mastercard',
      brandLabel: '',
    })

    expect(wrapper.text()).toContain(i18n.global.t('page.mastercard.title'))
  })
})
