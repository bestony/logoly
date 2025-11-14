import { config } from '@vue/test-utils';
import { vi } from 'vitest';

const slotStub = {
  inheritAttrs: false,
  template: `
    <div v-bind="$attrs">
      <slot name="activator"></slot>
      <slot name="text"></slot>
      <slot></slot>
    </div>
  `
};

const vuetifyTags = [
  'v-btn',
  'v-checkbox-btn',
  'v-color-picker',
  'v-expansion-panel',
  'v-expansion-panels',
  'v-icon',
  'v-list',
  'v-list-item',
  'v-menu',
  'v-select',
  'v-slider',
  'v-tooltip'
];

config.global.stubs = {
  ...(config.global.stubs ?? {}),
  ...Object.fromEntries(vuetifyTags.map((tag) => [tag, slotStub])),
  'router-link': {
    template: '<a><slot /></a>'
  },
  'router-view': {
    template: '<div><slot /></div>'
  }
};

if (typeof window !== 'undefined') {
  if (!window.matchMedia) {
    window.matchMedia = () => ({
      matches: false,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() {
        return false;
      },
      media: ''
    });
  }

  if (!window.scrollTo) {
    window.scrollTo = () => {};
  }

  if (!window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = () => {};
  }
}

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

globalThis.ResizeObserver = globalThis.ResizeObserver ?? ResizeObserver;
globalThis.IntersectionObserver = globalThis.IntersectionObserver ?? IntersectionObserver;

if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = () => ({
    drawImage() {},
    clearRect() {}
  });
  HTMLCanvasElement.prototype.toDataURL = () => 'data:image/png;base64,stub';
}

vi.mock('vue-gtag', () => ({
  event: vi.fn()
}));

globalThis.open = globalThis.open ?? (() => {});
