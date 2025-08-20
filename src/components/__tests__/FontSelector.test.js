import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import FontSelector from '../FontSelector.vue';
import { useStore } from '@/stores/store';

// Mock Vuetify select component
const MockVSelect = {
  name: 'v-select',
  props: ['modelValue', 'items', 'label'],
  emits: ['update:modelValue'],
  template: `
    <select 
      :value="modelValue" 
      @change="$emit('update:modelValue', $event.target.value)"
      data-testid="font-select"
    >
      <option v-for="item in items" :key="item" :value="item">{{ item }}</option>
    </select>
  `
};

describe('FontSelector', () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useStore();
  });

  it('renders correctly', () => {
    const wrapper = mount(FontSelector, {
      global: {
        plugins: [createPinia()],
        components: {
          'v-select': MockVSelect
        }
      }
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="font-select"]').exists()).toBe(true);
  });

  it('includes expected fonts in the options', () => {
    const wrapper = mount(FontSelector, {
      global: {
        plugins: [createPinia()],
        components: {
          'v-select': MockVSelect
        }
      }
    });

    // Access the component's data to verify fonts array
    const fonts = wrapper.vm.fonts;
    expect(fonts).toContain('Roboto');
    expect(fonts).toContain('Open Sans');
    expect(fonts).toContain('Lato');
    expect(fonts).toContain('Montserrat');
  });

  it('uses the store font value', () => {
    const wrapper = mount(FontSelector, {
      global: {
        plugins: [createPinia()],
        components: {
          'v-select': MockVSelect
        }
      }
    });

    // Initially store should have Roboto
    expect(store.font).toBe('Roboto');
    
    // The select should show the current store value
    const select = wrapper.find('[data-testid="font-select"]');
    expect(select.element.value).toBe('Roboto');
  });
});