import { describe, it, expect, beforeEach, vi } from 'vitest';

const loadModule = async () => {
  vi.resetModules();
  const module = await import('@/utils/fontLoader.js');
  return module;
};

describe('loadGoogleFont', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  it('creates a preload link and converts it to stylesheet on load', async () => {
    const { loadGoogleFont } = await loadModule();
    loadGoogleFont('  Roboto  ');
    const link = document.head.querySelector('link');
    expect(link).toBeTruthy();
    expect(link.rel).toBe('preload');
    expect(link.href).toContain('Roboto');

    link.onload();
    expect(link.rel).toBe('stylesheet');
  });

  it('avoids duplicate requests while a font is pending or already loaded', async () => {
    const { loadGoogleFont } = await loadModule();
    loadGoogleFont('Lora');
    loadGoogleFont('Lora');
    expect(document.head.querySelectorAll('link').length).toBe(1);

    const [first] = document.head.querySelectorAll('link');
    first.onload();
    loadGoogleFont('Lora');
    expect(document.head.querySelectorAll('link').length).toBe(1);
  });

  it('retries after an error by cleaning the pending state', async () => {
    const { loadGoogleFont } = await loadModule();
    loadGoogleFont('Inter');
    let link = document.head.querySelector('link');
    expect(link).toBeTruthy();
    link.onerror();
    expect(document.head.querySelector('link')).toBeNull();

    loadGoogleFont('Inter');
    link = document.head.querySelector('link');
    expect(link).toBeTruthy();
  });

  it('no-ops when the DOM is unavailable', async () => {
    const originalWindow = globalThis.window;
    const originalDocument = globalThis.document;
    vi.resetModules();
    try {
      // @ts-expect-error override for test
      globalThis.window = undefined;
      // @ts-expect-error override for test
      globalThis.document = undefined;
      const { loadGoogleFont } = await import('@/utils/fontLoader.js');
      expect(() => loadGoogleFont('Roboto')).not.toThrow();
    } finally {
      globalThis.window = originalWindow;
      globalThis.document = originalDocument;
      vi.resetModules();
    }
  });
});
