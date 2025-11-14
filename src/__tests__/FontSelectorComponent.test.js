import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import FontSelector from '@/components/FontSelector.vue';
import { useStore } from '@/stores/store';
import { loadGoogleFont } from '@/utils/fontLoader';

vi.mock('@/utils/fontLoader', () => ({
  loadGoogleFont: vi.fn()
}));

const VSelectStub = defineComponent({
  name: 'VSelectStub',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  template: `<select class="v-select-stub" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
    <option v-for="option in items" :key="option" :value="option">{{ option }}</option>
  </select>`
});

describe('FontSelector component', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('loads the current font immediately and on selection changes', async () => {
    const wrapper = mount(FontSelector, {
      global: {
        stubs: {
          'v-select': VSelectStub
        }
      }
    });
    const store = useStore();

    expect(loadGoogleFont).toHaveBeenCalledTimes(1);
    expect(loadGoogleFont).toHaveBeenCalledWith(store.font);

    loadGoogleFont.mockClear();
    const select = wrapper.get('select');
    await select.setValue('Lora');

    expect(loadGoogleFont).toHaveBeenCalledTimes(1);
    expect(loadGoogleFont).toHaveBeenCalledWith('Lora');
    expect(wrapper.html()).toContain('Font');
  });
});
