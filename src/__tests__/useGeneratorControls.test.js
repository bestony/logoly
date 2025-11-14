import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import { useGeneratorControls } from '@/composables/useGeneratorControls';
import { useStore } from '@/stores/store';
import { GENERATOR_STATE_STORAGE_KEY } from '@/utils/persistentState';

const mountedWrappers = new Set();

const mountComposable = (options) => {
  let api;
  const Comp = defineComponent({
    template: '<div />',
    setup() {
      api = useGeneratorControls(options);
      return api;
    }
  });

  const wrapper = mount(Comp);
  mountedWrappers.add(wrapper);
  return { wrapper, api };
};

describe('useGeneratorControls', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    window.localStorage.clear();
    window.history.replaceState(null, '', '/');
  });

  afterEach(() => {
    mountedWrappers.forEach((wrapper) => {
      if (wrapper.exists()) {
        wrapper.unmount();
      }
    });
    mountedWrappers.clear();
  });

  it('provides sensible defaults and computed helpers', () => {
    const { api } = mountComposable();

    expect(api.prefixColor.value).toBe('#ffffff');
    expect(api.suffixColor.value).toBe('#000000');
    expect(api.transparentBgColor.value).toBe('#000000');
    expect(api.suffixMargin.value).toBeUndefined();

    api.transparentBg.value = true;
    expect(api.transparentBgColor.value).toBe('transparent');

    const custom = mountComposable({ suffixMarginScale: 30 });
    custom.api.fontSize.value = 90;
    expect(custom.api.suffixMargin.value).toBe('-3rem');
  });

  it('forwards text updates to the store', () => {
    const store = useStore();
    const prefixSpy = vi.spyOn(store, 'updatePrefix');
    const suffixSpy = vi.spyOn(store, 'updateSuffix');

    const { api } = mountComposable();
    api.updatePrefix({ target: { textContent: 'Porn' } });
    api.updateSuffix({ target: { innerText: 'hub' } });
    api.updatePrefix({ target: { innerText: 'Only' } });
    api.updateSuffix({ target: {} });
    api.updatePrefix(null);

    expect(prefixSpy).toHaveBeenCalledWith('Porn');
    expect(prefixSpy).toHaveBeenLastCalledWith('Only');
    expect(suffixSpy).toHaveBeenCalledWith('hub');
    expect(suffixSpy).toHaveBeenLastCalledWith('');
  });

  it('hydrates initial text on mount when nothing is persisted', async () => {
    const store = useStore();
    const prefixSpy = vi.spyOn(store, 'updatePrefix');
    const suffixSpy = vi.spyOn(store, 'updateSuffix');

    const { wrapper } = mountComposable({
      backgroundColor: '#222222',
      initialText: { prefix: 'Only', suffix: 'Fans' },
      resetText: { prefix: 'edit', suffix: 'me' }
    });

    await nextTick();
    expect(prefixSpy).toHaveBeenCalledWith('Only');
    expect(suffixSpy).toHaveBeenCalledWith('Fans');

    wrapper.unmount();
    await nextTick();
    expect(prefixSpy).not.toHaveBeenCalledWith('edit');
    expect(suffixSpy).not.toHaveBeenCalledWith('me');
  });

  it('handles partial initial payloads without clobbering other fields', async () => {
    const store = useStore();
    const prefixSpy = vi.spyOn(store, 'updatePrefix');
    const suffixSpy = vi.spyOn(store, 'updateSuffix');

    const suffixOnly = mountComposable({ initialText: { suffix: 'Fans' } });
    await nextTick();
    expect(prefixSpy).not.toHaveBeenCalled();
    expect(suffixSpy).toHaveBeenCalledWith('Fans');
    suffixOnly.wrapper.unmount();
    await nextTick();

    prefixSpy.mockClear();
    suffixSpy.mockClear();

    const prefixOnly = mountComposable({ initialText: { prefix: 'Only' } });
    await nextTick();
    expect(prefixSpy).toHaveBeenCalledWith('Only');
    expect(suffixSpy).not.toHaveBeenCalled();
    prefixOnly.wrapper.unmount();
    await nextTick();
  });

  it('persists generator state to localStorage and query params', async () => {
    const store = useStore();
    const { api } = mountComposable();

    await store.updatePrefix('Share');
    await store.updateSuffix('Logo');
    store.font = 'Open Sans';
    api.prefixColor.value = '#123123';
    api.suffixColor.value = '#abcdef';
    api.postfixBgColor.value = '#654321';
    api.fontSize.value = 110;
    api.transparentBg.value = true;
    api.reverseHighlight.value = true;
    await nextTick();

    const saved = JSON.parse(window.localStorage.getItem(GENERATOR_STATE_STORAGE_KEY));
    expect(saved.prefix).toBe('Share');
    expect(saved.suffix).toBe('Logo');
    expect(saved.font).toBe('Open Sans');
    expect(saved.prefixColor).toBe('#123123');
    expect(saved.transparentBg).toBe(true);
    expect(window.location.search).toContain('prefix=Share');
    expect(window.location.search).toContain('reverseHighlight=1');
  });

  it('restores state from storage and lets query params override it', async () => {
    window.localStorage.setItem(
      GENERATOR_STATE_STORAGE_KEY,
      JSON.stringify({
        prefix: 'StoredPrefix',
        suffix: 'StoredSuffix',
        font: 'Lora',
        prefixColor: '#101010',
        suffixColor: '#202020',
        postfixBgColor: '#303030',
        fontSize: 80,
        transparentBg: true,
        reverseHighlight: false
      })
    );
    window.history.replaceState(
      null,
      '',
      '/?prefix=QueryPrefix&suffixColor=%23aa00aa&reverseHighlight=1'
    );

    const { api } = mountComposable({ initialText: { prefix: 'Default', suffix: 'Values' } });
    const store = useStore();
    await nextTick();

    expect(store.prefix).toBe('QueryPrefix');
    expect(store.suffix).toBe('StoredSuffix');
    expect(store.font).toBe('Lora');
    expect(api.prefixColor.value).toBe('#101010');
    expect(api.suffixColor.value).toBe('#aa00aa');
    expect(api.postfixBgColor.value).toBe('#303030');
    expect(api.fontSize.value).toBe(80);
    expect(api.transparentBg.value).toBe(true);
    expect(api.reverseHighlight.value).toBe(true);
  });

  it('builds the Twitter intent url with the expected payload', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => {});
    const { api } = mountComposable();

    api.twitter();

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy.mock.calls[0][0]).toContain('twitter.com/intent/tweet');
    expect(openSpy.mock.calls[0][0]).toContain('logoly.pro');

    openSpy.mockRestore();
  });

  it('hydrates correctly even when store updates resolve synchronously', async () => {
    const store = useStore();
    const originalPrefix = store.updatePrefix;
    const originalSuffix = store.updateSuffix;

    store.updatePrefix = vi.fn((text) => {
      store.prefix = text;
      return text;
    });
    store.updateSuffix = vi.fn((text) => {
      store.suffix = text;
      return text;
    });

    mountComposable({ initialText: { prefix: 'Sync', suffix: 'State' } });
    await nextTick();
    expect(store.updatePrefix).toHaveBeenCalledWith('Sync');
    expect(store.updateSuffix).toHaveBeenCalledWith('State');
    expect(store.prefix).toBe('Sync');
    expect(store.suffix).toBe('State');

    store.updatePrefix = originalPrefix;
    store.updateSuffix = originalSuffix;
  });

  it('resets text on unmount when persistence is disabled', async () => {
    const store = useStore();
    await store.updatePrefix('Tmp');
    await store.updateSuffix('State');

    const prefixSpy = vi.spyOn(store, 'updatePrefix');
    const suffixSpy = vi.spyOn(store, 'updateSuffix');

    const { wrapper } = mountComposable({
      resetText: { prefix: 'edit', suffix: 'me' },
      persistenceEnabled: false
    });

    await nextTick();
    prefixSpy.mockClear();
    suffixSpy.mockClear();

    wrapper.unmount();
    await nextTick();

    expect(prefixSpy).toHaveBeenCalledWith('edit');
    expect(suffixSpy).toHaveBeenCalledWith('me');
  });

  it('does not reset prefix when resetText omits it', async () => {
    const store = useStore();
    const prefixSpy = vi.spyOn(store, 'updatePrefix');
    const suffixSpy = vi.spyOn(store, 'updateSuffix');

    const { wrapper } = mountComposable({
      resetText: { suffix: 'stay' },
      persistenceEnabled: false
    });

    await nextTick();
    prefixSpy.mockClear();
    suffixSpy.mockClear();

    wrapper.unmount();
    await nextTick();

    expect(prefixSpy).not.toHaveBeenCalled();
    expect(suffixSpy).toHaveBeenCalledWith('stay');
  });

  it('does not reset suffix when resetText omits it', async () => {
    const store = useStore();
    const prefixSpy = vi.spyOn(store, 'updatePrefix');
    const suffixSpy = vi.spyOn(store, 'updateSuffix');

    const { wrapper } = mountComposable({
      resetText: { prefix: 'back' },
      persistenceEnabled: false
    });

    await nextTick();
    prefixSpy.mockClear();
    suffixSpy.mockClear();

    wrapper.unmount();
    await nextTick();

    expect(prefixSpy).toHaveBeenCalledWith('back');
    expect(suffixSpy).not.toHaveBeenCalled();
  });

  it('continues hydrating when a task rejects', async () => {
    const store = useStore();
    const originalPrefix = store.updatePrefix;
    const rejection = new Error('hydrate failure');
    store.updatePrefix = vi.fn(() => Promise.reject(rejection));
    const suffixSpy = vi.spyOn(store, 'updateSuffix');

    mountComposable({ initialText: { prefix: 'Only', suffix: 'Fans' } });
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(store.updatePrefix).toHaveBeenCalledWith('Only');
    expect(suffixSpy).toHaveBeenCalledWith('Fans');

    store.updatePrefix = originalPrefix;
  });
});
