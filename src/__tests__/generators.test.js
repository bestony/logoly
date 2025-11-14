import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import Pornhub from '@/components/generator/Pornhub.vue';
import VerticalPornHub from '@/components/generator/VerticalPornHub.vue';
import Onlyfans from '@/components/generator/Onlyfans.vue';
import { useStore } from '@/stores/store';

const TooltipStub = defineComponent({
  name: 'TooltipStub',
  inheritAttrs: false,
  template: `<div class="tooltip-stub"><slot name="activator" :props="{}"></slot><slot name="text"></slot><slot /></div>`
});

const MenuStub = defineComponent({
  name: 'MenuStub',
  inheritAttrs: false,
  template: `<div class="menu-stub"><slot name="activator" :props="{}"></slot><slot /></div>`
});

const ColorPickerStub = defineComponent({
  name: 'ColorPickerStub',
  inheritAttrs: false,
  emits: ['update:modelValue'],
  template: `<div class="color-picker-stub"><slot /></div>`
});

const SliderStub = defineComponent({
  name: 'SliderStub',
  inheritAttrs: false,
  emits: ['update:modelValue'],
  template: `<div class="slider-stub"><slot /></div>`
});

const CheckboxStub = defineComponent({
  name: 'CheckboxStub',
  inheritAttrs: false,
  emits: ['update:modelValue'],
  template: `<button class="checkbox-stub"><slot /></button>`
});

const ButtonStub = defineComponent({
  name: 'ButtonStub',
  inheritAttrs: false,
  emits: ['click'],
  template: `<button class="btn-stub"><slot /></button>`
});

const IconStub = defineComponent({
  name: 'IconStub',
  template: `<i class="icon-stub"><slot /></i>`
});

const generatorStubs = {
  ExportBtn: { template: '<button class="export-btn-stub" />' },
  FontSelector: { template: '<div class="font-selector-stub" />' },
  'v-tooltip': TooltipStub,
  'v-menu': MenuStub,
  'v-color-picker': ColorPickerStub,
  'v-slider': SliderStub,
  'v-checkbox-btn': CheckboxStub,
  'v-btn': ButtonStub,
  'v-icon': IconStub
};

const mountGenerator = (component) =>
  mount(component, {
    attachTo: document.body,
    global: {
      stubs: generatorStubs
    }
  });

const editContent = async (wrapper, selector, value) => {
  const target = wrapper.get(selector);
  target.element.textContent = value;
  await target.trigger('input');
  return target;
};

describe('generator components', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    setActivePinia(createPinia());
    window.localStorage.clear();
    window.history.replaceState(null, '', '/');
  });

  it('synchronizes text updates and highlight order in Pornhub generator', async () => {
    const store = useStore();
    const wrapper = mountGenerator(Pornhub);

    await editContent(wrapper, '.prefix', 'Only');
    await editContent(wrapper, '.postfix', 'Fans');

    expect(store.prefix).toBe('Only');
    expect(store.suffix).toBe('Fans');

    wrapper.vm.reverseHighlight = true;
    await nextTick();

    const [prefixAfterToggle] = wrapper.findAll('.prefix');
    expect(prefixAfterToggle.text().trim()).toBe('Fans');

    await editContent(wrapper, '.postfix', 'SwappedPrefix');
    await editContent(wrapper, '.prefix', 'SwappedSuffix');
    expect(store.prefix).toBe('SwappedPrefix');
    expect(store.suffix).toBe('SwappedSuffix');

    wrapper.vm.transparentBg = true;
    await nextTick();
    expect(wrapper.get('#logo').attributes('style')).toContain('background-color: transparent');

    wrapper.unmount();
  });

  it('supports vertical layout interactions', async () => {
    const store = useStore();
    const wrapper = mountGenerator(VerticalPornHub);

    await editContent(wrapper, '.prefix', 'Logo');
    await editContent(wrapper, '.postfix', 'Lab');

    expect(store.prefix).toBe('Logo');
    expect(store.suffix).toBe('Lab');

    const colorPickers = wrapper.findAllComponents(ColorPickerStub);
    await colorPickers[0].vm.$emit('update:modelValue', '#123123');
    await colorPickers[1].vm.$emit('update:modelValue', '#abcdef');
    await colorPickers[2].vm.$emit('update:modelValue', '#fedcba');
    await nextTick();

    const checkboxes = wrapper.findAllComponents(CheckboxStub);
    await checkboxes[1].vm.$emit('update:modelValue', true);
    await nextTick();
    expect(wrapper.findAll('.prefix')[0].text().trim()).toBe('Lab');
    await editContent(wrapper, '.postfix', 'VerticalPrefix');
    await editContent(wrapper, '.prefix', 'VerticalSuffix');

    const slider = wrapper.getComponent(SliderStub);
    await checkboxes[0].vm.$emit('update:modelValue', true);
    await slider.vm.$emit('update:modelValue', 120);
    await nextTick();
    expect(wrapper.get('#logo').attributes('style')).toContain('font-size: 120px');
    expect(wrapper.get('#logo').attributes('style')).toContain('background-color: transparent');

    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => {});
    const button = wrapper.findComponent(ButtonStub);
    await button.vm.$emit('click');
    expect(openSpy).toHaveBeenCalledWith(expect.stringContaining('twitter.com/intent/tweet'));
    openSpy.mockRestore();

    wrapper.unmount();
  });

  it('applies Onlyfans-specific defaults and suffix margins', async () => {
    const store = useStore();
    const wrapper = mountGenerator(Onlyfans);

    expect(store.prefix).toBe('Only');
    expect(store.suffix).toBe('Fans');

    const postfix = wrapper.get('.postfix');
    expect(postfix.attributes('style')).toContain('margin-left: -2rem');

    const slider = wrapper.getComponent(SliderStub);
    await slider.vm.$emit('update:modelValue', 100);
    await nextTick();
    expect(wrapper.get('#logo').attributes('style')).toContain('font-size: 100px');

    postfix.element.textContent = 'Creators';
    await postfix.trigger('input');

    await editContent(wrapper, '.prefix', 'OnlyYou');
    expect(store.prefix).toBe('OnlyYou');
    expect(store.suffix).toBe('Creators');

    const checkbox = wrapper.getComponent(CheckboxStub);
    await checkbox.vm.$emit('update:modelValue', true);
    await nextTick();
    expect(wrapper.get('#logo').attributes('style')).toContain('background-color: transparent');

    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => {});
    const button = wrapper.findComponent(ButtonStub);
    await button.vm.$emit('click');
    expect(openSpy).toHaveBeenCalledTimes(1);
    openSpy.mockRestore();

    wrapper.unmount();
  });

  it('reacts to visual controls and share actions', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => {});
    const wrapper = mountGenerator(Pornhub);

    const colorPickers = wrapper.findAllComponents(ColorPickerStub);
    await colorPickers[0].vm.$emit('update:modelValue', '#ff0000');
    await colorPickers[1].vm.$emit('update:modelValue', '#00ff00');
    await colorPickers[2].vm.$emit('update:modelValue', '#123456');
    await nextTick();

    const slider = wrapper.getComponent(SliderStub);
    await slider.vm.$emit('update:modelValue', 150);
    await nextTick();

    const checkboxes = wrapper.findAllComponents(CheckboxStub);
    await checkboxes[0].vm.$emit('update:modelValue', true);
    await checkboxes[1].vm.$emit('update:modelValue', true);
    await nextTick();

    const logoStyles = wrapper.get('#logo').attributes('style');
    expect(logoStyles).toContain('font-size: 150px');
    expect(logoStyles).toContain('background-color: transparent');

    const spanStyles = wrapper.get('.postfix').attributes('style');
    expect(spanStyles).toContain('rgb(18, 52, 86)');

    const button = wrapper.findComponent(ButtonStub);
    await button.vm.$emit('click');
    expect(openSpy).toHaveBeenCalledWith(expect.stringContaining('twitter.com/intent/tweet'));

    openSpy.mockRestore();
    wrapper.unmount();
  });
});
