import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AboutView from '@/views/AboutView.vue';

describe('AboutView', () => {
  it('links to the GitHub repository', () => {
    const wrapper = mount(AboutView);
    expect(wrapper.text()).toContain('Logoly.pro');
    const link = wrapper.get('a');
    expect(link.attributes('href')).toBe('https://github.com/bestony/logoly');
    expect(link.attributes('target')).toBe('_blank');
  });
});
