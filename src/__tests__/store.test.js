import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useStore } from '@/stores/store';

const getStoreInternals = () => {
  const internals = globalThis.__LOGOLY_STORE_INTERNALS__;
  if (!internals) {
    throw new Error('Store internals were not exposed for testing');
  }
  return internals;
};

const mountEditable = (content = 'editme', options = {}) => {
  const container = document.createElement('div');
  container.setAttribute('contenteditable', 'true');
  container.id = `logo-${Math.random().toString(16).slice(2)}`;
  if (options.raw) {
    container.innerHTML = content;
  } else {
    container.textContent = content;
  }
  document.body.appendChild(container);
  return container;
};

const selectRange = (startNode, startOffset, endNode = startNode, endOffset = startOffset) => {
  const range = document.createRange();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  return selection;
};

describe('store', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    setActivePinia(createPinia());
  });

  it('updates prefix and restores the previous caret selection', async () => {
    const editable = mountEditable();
    const store = useStore();
    const selection = selectRange(editable.firstChild, 1, editable.firstChild, 3);

    await store.updatePrefix('changed');

    expect(store.prefix).toBe('changed');
    expect(selection.rangeCount).toBe(1);
    const range = selection.getRangeAt(0);
    expect(range.startOffset).toBe(1);
    expect(range.endOffset).toBe(3);
  });

  it('handles selections that span multiple text nodes', async () => {
    const editable = mountEditable('<span>hi</span><span>there</span>', {
      raw: true
    });
    const spans = editable.querySelectorAll('span');
    const store = useStore();
    const selection = selectRange(spans[1].firstChild, 1, spans[1].firstChild, 4);

    await store.updatePrefix('merged');

    expect(selection.getRangeAt(0).startContainer).toBe(spans[1].firstChild);
    expect(selection.getRangeAt(0).startOffset).toBe(1);
  });

  it('ignores unsupported node types when capturing selections', async () => {
    const editable = mountEditable();
    const comment = document.createComment('skip');
    editable.appendChild(comment);
    const selection = selectRange(comment, 0, comment, 0);
    const removeSpy = vi.spyOn(selection, 'removeAllRanges');
    const store = useStore();

    await store.updatePrefix('noop');

    expect(removeSpy).not.toHaveBeenCalled();
    removeSpy.mockRestore();
  });

  it('skips restoration when the selection moves outside the editable root', async () => {
    const editable = mountEditable();
    const outside = document.createElement('p');
    outside.textContent = 'outer';
    document.body.appendChild(outside);
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(editable.firstChild, 0);
    range.setEnd(outside.firstChild, 1);
    selection.removeAllRanges();
    selection.addRange(range);
    const removeSpy = vi.spyOn(selection, 'removeAllRanges');

    const store = useStore();
    await store.updatePrefix('value');

    expect(store.prefix).toBe('value');
    expect(removeSpy).not.toHaveBeenCalled();
    removeSpy.mockRestore();
  });

  it('avoids restoring when the editable element is removed', async () => {
    const editable = mountEditable();
    const store = useStore();
    const spy = vi.spyOn(window, 'getSelection');
    selectRange(editable.firstChild, 0, editable.firstChild, 2);

    const promise = store.updatePrefix('gone');
    editable.remove();
    await promise;

    expect(spy).toHaveBeenCalledTimes(2); // once from helper, once from capture
    spy.mockRestore();
  });

  it('restores suffix selections even inside empty containers', async () => {
    const editable = mountEditable('', { raw: true });
    const store = useStore();
    const selection = selectRange(editable, 0, editable, 0);

    await store.updateSuffix('tail');

    expect(store.suffix).toBe('tail');
    const range = selection.getRangeAt(0);
    expect(range.startContainer).toBe(editable);
    expect(range.startOffset).toBe(0);
  });

  it('updates suffix without touching selection when nothing is focused', async () => {
    const store = useStore();
    const spy = vi.spyOn(window, 'getSelection').mockReturnValue(null);

    await store.updateSuffix('tail');

    expect(store.suffix).toBe('tail');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('ignores selections that are missing a valid start container', async () => {
    const store = useStore();
    const fakeRange = {
      startContainer: null,
      endContainer: document.createElement('div'),
      startOffset: 0,
      endOffset: 0
    };
    const selection = {
      rangeCount: 1,
      getRangeAt: vi.fn(() => fakeRange)
    };
    const spy = vi.spyOn(window, 'getSelection').mockReturnValue(selection);

    await store.updatePrefix('noop');

    expect(selection.getRangeAt).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('skips restoring when selection disappears mid-update', async () => {
    const editable = mountEditable();
    const realSelection = selectRange(editable.firstChild, 0, editable.firstChild, 2);
    const store = useStore();
    const spy = vi.spyOn(window, 'getSelection');
    spy.mockImplementationOnce(() => realSelection);
    spy.mockImplementationOnce(() => null);
    spy.mockImplementation(() => realSelection);

    await store.updatePrefix('persist');

    expect(store.prefix).toBe('persist');
    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockRestore();
  });

  it('falls back to root positions when text nodes are removed', async () => {
    const editable = mountEditable('ab');
    const store = useStore();
    selectRange(editable.firstChild, 0, editable.firstChild, 2);

    const promise = store.updatePrefix('target');
    editable.innerHTML = '<br />';
    await promise;

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    expect(range.startContainer).toBe(editable);
    expect(range.startOffset).toBeGreaterThanOrEqual(0);
  });
});

describe('store internals', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    getStoreInternals().clearOverrides();
  });

  it('returns null for text nodes without editable ancestors', () => {
    const internals = getStoreInternals();
    const wrapper = document.createElement('div');
    wrapper.textContent = 'plain';
    document.body.appendChild(wrapper);

    expect(internals.getEditableAncestor(wrapper.firstChild)).toBeNull();
  });

  it('returns null for element nodes without editable ancestors', () => {
    const internals = getStoreInternals();
    const wrapper = document.createElement('div');
    const child = document.createElement('span');
    wrapper.appendChild(child);
    document.body.appendChild(wrapper);

    expect(internals.getEditableAncestor(child)).toBeNull();
  });

  it('treats walker nodes without text content as zero length', () => {
    const internals = getStoreInternals();
    const originalWalker = document.createTreeWalker;
    const fakeNode = { textContent: undefined };
    const walker = {
      currentNode: null,
      called: false,
      nextNode() {
        if (this.called) return false;
        this.called = true;
        this.currentNode = fakeNode;
        return true;
      }
    };
    document.createTreeWalker = vi.fn(() => walker);

    try {
      const root = document.createElement('div');
      const result = internals.resolvePosition(root, 0);
      expect(result).toEqual({ node: fakeNode, offset: 0 });
    } finally {
      document.createTreeWalker = originalWalker;
    }
  });

  it('falls back to length zero when editable textContent returns null', () => {
    const internals = getStoreInternals();
    const editable = mountEditable();
    selectRange(editable.firstChild, 1, editable.firstChild, 1);
    const snapshot = internals.captureSelectionSnapshot();
    expect(snapshot).not.toBeNull();

    const originalDescriptor = Object.getOwnPropertyDescriptor(editable, 'textContent');
    Object.defineProperty(editable, 'textContent', {
      configurable: true,
      get() {
        return null;
      },
      set(value) {
        if (originalDescriptor?.set) {
          originalDescriptor.set.call(editable, value);
        }
      }
    });

    const selection = window.getSelection();
    selection.removeAllRanges();
    internals.restoreSelectionSnapshot(snapshot);

    expect(selection.rangeCount).toBe(1);
    Reflect.deleteProperty(editable, 'textContent');
  });

  it('skips selection restoration when overrides return null positions', () => {
    const internals = getStoreInternals();
    const editable = mountEditable();
    selectRange(editable.firstChild, 0, editable.firstChild, 2);
    const snapshot = internals.captureSelectionSnapshot();
    expect(snapshot).not.toBeNull();

    internals.setResolvePositionOverride(() => null);
    window.getSelection().removeAllRanges();

    internals.restoreSelectionSnapshot(snapshot);

    expect(window.getSelection().rangeCount).toBe(0);
  });
});

describe('store without DOM APIs', () => {
  it('short-circuits DOM helpers when window and document are missing', async () => {
    const realWindow = globalThis.window;
    const realDocument = globalThis.document;
    const realNodeFilter = globalThis.NodeFilter;

    globalThis.window = undefined;
    globalThis.document = undefined;
    globalThis.NodeFilter = undefined;

    vi.resetModules();

    const { useStore: useStoreWithoutDom } = await import('@/stores/store');
    const internals = getStoreInternals();

    setActivePinia(createPinia());
    const store = useStoreWithoutDom();

    await store.updatePrefix('noop');
    await store.updateSuffix('noop');
    expect(() =>
      internals.restoreSelectionSnapshot({
        editableElement: null,
        startOffset: 0,
        endOffset: 0
      })
    ).not.toThrow();

    globalThis.window = realWindow;
    globalThis.document = realDocument;
    globalThis.NodeFilter = realNodeFilter;
    vi.resetModules();
    setActivePinia(createPinia());
    await import('@/stores/store');
  });
});
