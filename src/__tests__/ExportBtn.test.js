import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import ExportBtn from '@/components/ExportBtn.vue';
import { useStore } from '@/stores/store';

const domToImageMock = vi.hoisted(() => ({
  toPng: vi.fn(() => Promise.resolve('data:image/png;base64,mock')),
  toSvg: vi.fn(() => Promise.resolve('data:image/svg+xml,mock'))
}));

const onClickOutsideMock = vi.hoisted(() => vi.fn((_, handler) => handler()));

vi.mock('dom-to-image', () => ({
  __esModule: true,
  default: domToImageMock
}));

vi.mock('@vueuse/core', () => ({
  onClickOutside: onClickOutsideMock
}));
describe('ExportBtn', () => {
  let OriginalImage;
  let clickSpy;

  beforeAll(() => {
    OriginalImage = window.Image;
    window.Image = class {
      constructor() {
        this.width = 100;
        this.height = 50;
      }
      setAttribute() {}
      set onload(handler) {
        this._onload = handler;
      }
      get onload() {
        return this._onload;
      }
      set src(value) {
        this._src = value;
        this._onload?.();
      }
    };
    clickSpy = vi.spyOn(window.HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  });

  afterAll(() => {
    window.Image = OriginalImage;
    clickSpy.mockRestore();
  });

  beforeEach(() => {
    document.body.innerHTML = '<div id="logo"></div>';
    setActivePinia(createPinia());
    domToImageMock.toPng.mockClear();
    domToImageMock.toSvg.mockClear();
    onClickOutsideMock.mockClear();
  });

  const mountButton = () => mount(ExportBtn);
  const flush = () => new Promise((resolve) => setTimeout(resolve));

  it('exports the editable area as PNG', async () => {
    const store = useStore();
    store.prefix = 'Porn';
    store.suffix = 'hub';
    const wrapper = mountButton();

    await wrapper.find('[value="png"]').trigger('click');
    expect(domToImageMock.toPng).toHaveBeenCalledWith(document.getElementById('logo'));

    await flush();

    expect(store.editable).toBe(true);
    expect(onClickOutsideMock).toHaveBeenCalled();
  });

  it('exports the editable area as SVG', async () => {
    const store = useStore();
    store.prefix = 'Only';
    store.suffix = 'Fans';
    const wrapper = mountButton();

    await wrapper.find('[value="svg"]').trigger('click');
    expect(domToImageMock.toSvg).toHaveBeenCalledWith(document.getElementById('logo'));

    await flush();

    expect(clickSpy).toHaveBeenCalled();
    expect(store.editable).toBe(true);
  });

  it('skips exporting when the logo node is missing', async () => {
    document.body.innerHTML = '';
    setActivePinia(createPinia());
    const wrapper = mountButton();

    await wrapper.find('[value="png"]').trigger('click');

    expect(domToImageMock.toPng).not.toHaveBeenCalled();
  });

  it('falls back to the default filename when none is provided', () => {
    const dispatchSpy = vi.spyOn(window.HTMLAnchorElement.prototype, 'dispatchEvent');
    const wrapper = mountButton();
    const { downloadImage } = wrapper.vm.$.setupState;

    expect(typeof downloadImage).toBe('function');
    downloadImage('data:image/png;base64,stub');

    expect(dispatchSpy).toHaveBeenCalled();
    dispatchSpy.mockRestore();
  });
});
