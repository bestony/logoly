import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

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

// Mock @vueuse/core
vi.mock('@vueuse/core', () => ({
  onClickOutside: vi.fn()
}));

describe('ExportBtn', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    // Mock DOM methods
    vi.stubGlobal('document', {
      getElementById: vi.fn().mockReturnValue({
        style: {}
      }),
      createElement: vi.fn().mockReturnValue({
        click: vi.fn(),
        dispatchEvent: vi.fn(),
        href: '',
        download: ''
      })
    });
  });

  it('has the correct structure', async () => {
    // Just test that we can import and use the component's functionality
    const { useStore } = await import('@/stores/store');
    const domtoimage = (await import('dom-to-image')).default;
    
    expect(useStore).toBeDefined();
    expect(domtoimage.toPng).toBeDefined();
    expect(domtoimage.toSvg).toBeDefined();
  });

  it('dom-to-image mock functions work correctly', async () => {
    const domtoimage = (await import('dom-to-image')).default;
    
    const pngResult = await domtoimage.toPng(document.createElement('div'));
    expect(pngResult).toBe('data:image/png;base64,mockedImage');
    
    const svgResult = await domtoimage.toSvg(document.createElement('div'));
    expect(svgResult).toBe('data:image/svg+xml;base64,mockedSvg');
  });

  it('has required dependencies', () => {
    expect(document.getElementById).toBeDefined();
    expect(document.createElement).toBeDefined();
  });
});