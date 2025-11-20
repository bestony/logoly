import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SiteFooter from '../components/SiteFooter.vue'

describe('SiteFooter', () => {
  it('renders copyright text and links', () => {
    const wrapper = mount(SiteFooter)
    expect(wrapper.text()).toContain('© 2025 Logoly')
    expect(wrapper.text()).toContain('v1.0.0-test')

    const links = wrapper.findAll('a')
    const hrefs = links.map((link) => link.attributes('href'))

    expect(hrefs).toContain('https://github.com/bestony/logoly')
    expect(hrefs).toContain('https://x.com/xiqingongzi')
    expect(hrefs).toContain('https://www.ixiqin.com/to-contact-me/')
  })
})
