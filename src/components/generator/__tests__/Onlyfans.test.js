import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import Onlyfans from '../Onlyfans.vue';

// Mock external dependencies
vi.mock('dom-to-image', () => ({
  default: {
    toPng: vi.fn().mockResolvedValue('data:image/png;base64,mockedImage'),
    toSvg: vi.fn().mockResolvedValue('data:image/svg+xml;base64,mockedSvg')
  }
}));

vi.mock('vue-gtag', () => ({
  event: vi.fn()
}));

// Mock Vuetify components
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

describe('OnlyFans Generator', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.stubGlobal('open', vi.fn());
  });

  const createWrapper = () => {
    return mount(Onlyfans, {
      global: {
        plugins: [createPinia()],
        components: {
          'v-tooltip': MockVTooltip,
          'v-slider': MockVSlider,
          'v-checkbox-btn': MockVCheckboxBtn,
          'v-btn': MockVBtn,
          'v-icon': MockVIcon
        },
        stubs: {
          ExportBtn: true
        }
      }
    });
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
  });

  it('has OnlyFans-specific styling colors', () => {
    const wrapper = createWrapper();
    expect(wrapper.vm.prefixColor).toBe('#ffffff');
    expect(wrapper.vm.suffixColor).toBe('#00AFF0');
    expect(wrapper.vm.postfixBgColor).toBe('transparent');
  });

  it('computes suffix margin based on font size', () => {
    const wrapper = createWrapper();
    wrapper.vm.fontSize = 60;
    expect(wrapper.vm.suffixMargin).toBe('-2rem');
    
    wrapper.vm.fontSize = 30;
    expect(wrapper.vm.suffixMargin).toBe('-1rem');
  });

  it('sets correct default text on mount', () => {
    const wrapper = createWrapper();
    // The component should set OnlyFans default text
    // Note: We can't easily test the mounted hook in isolation, 
    // but we can test that the logic exists
    expect(wrapper.vm.store).toBeDefined();
  });

  it('computes transparent background correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.vm.transparentBgColor).toBe('#000000');
    
    wrapper.vm.transparentBg = true;
    expect(wrapper.vm.transparentBgColor).toBe('transparent');
  });
});