import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import Pornhub from '../Pornhub.vue';

// Mock dom-to-image module
vi.mock('dom-to-image', () => ({
  default: {
    toPng: vi.fn().mockResolvedValue('data:image/png;base64,mockedImage'),
    toSvg: vi.fn().mockResolvedValue('data:image/svg+xml;base64,mockedSvg')
  }
}));

// Mock vue-gtag event function
vi.mock('vue-gtag', () => ({
  event: vi.fn()
}));

// Mock Vuetify components with simple implementations
const MockVTooltip = {
  name: 'v-tooltip',
  props: ['text', 'location', 'modelValue'],
  template: `<div><slot name="activator" :props="{}"></slot></div>`
};

const MockVSlider = {
  name: 'v-slider',
  props: ['modelValue', 'min', 'max', 'step', 'color'],
  emits: ['update:modelValue'],
  template: `<input type="range" :value="modelValue" @input="$emit('update:modelValue', +$event.target.value)" />`
};

const MockVCheckboxBtn = {
  name: 'v-checkbox-btn',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `<input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)" />`
};

const MockVBtn = {
  name: 'v-btn',
  props: ['color'],
  template: `<button><slot></slot></button>`
};

const MockVIcon = {
  name: 'v-icon',
  props: ['icon'],
  template: `<span>{{ icon }}</span>`
};

const MockVColorPicker = {
  name: 'v-color-picker',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `<input type="color" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />`
};

const MockVMenu = {
  name: 'v-menu',
  props: ['activator'],
  template: `<div><slot></slot></div>`
};

describe('Pornhub Generator', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    // Mock window.open for twitter functionality
    vi.stubGlobal('open', vi.fn());
  });

  const createWrapper = () => {
    return mount(Pornhub, {
      global: {
        plugins: [createPinia()],
        components: {
          'v-tooltip': MockVTooltip,
          'v-slider': MockVSlider,
          'v-checkbox-btn': MockVCheckboxBtn,
          'v-btn': MockVBtn,
          'v-icon': MockVIcon,
          'v-color-picker': MockVColorPicker,
          'v-menu': MockVMenu
        },
        stubs: {
          FontSelector: true,
          ExportBtn: true
        }
      }
    });
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.pornhub').exists()).toBe(true);
  });

  it('displays the logo with store text', () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain('edit');
    expect(wrapper.text()).toContain('me');
  });

  it('has correct initial color values', () => {
    const wrapper = createWrapper();
    expect(wrapper.vm.prefixColor).toBe('#ffffff');
    expect(wrapper.vm.suffixColor).toBe('#000000');
    expect(wrapper.vm.postfixBgColor).toBe('#ff9900');
    expect(wrapper.vm.fontSize).toBe(60);
  });

  it('computes transparent background color correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.vm.transparentBgColor).toBe('#000000');
    
    wrapper.vm.transparentBg = true;
    expect(wrapper.vm.transparentBgColor).toBe('transparent');
  });

  it('calls twitter function correctly', () => {
    const wrapper = createWrapper();
    wrapper.vm.twitter();
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('https://twitter.com/intent/tweet?text=')
    );
  });
});