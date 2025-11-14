import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadGeneratorState,
  saveGeneratorState,
  GENERATOR_STATE_STORAGE_KEY
} from '@/utils/persistentState';

describe('persistentState utilities', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState(null, '', '/');
  });

  it('parses boolean query params and preserves false values', () => {
    window.history.replaceState(null, '', '/?transparentBg=0&reverseHighlight=yes');
    const state = loadGeneratorState();
    expect(state.transparentBg).toBe(false);
    expect(state.reverseHighlight).toBe(true);
  });

  it('ignores malformed booleans and swallows storage parse errors', () => {
    window.history.replaceState(null, '', '/?transparentBg=maybe&prefixColor=%23fff');
    window.localStorage.setItem(GENERATOR_STATE_STORAGE_KEY, '{');

    const state = loadGeneratorState();
    expect(state.transparentBg).toBeUndefined();
    expect(state.prefixColor).toBe('#fff');
  });

  it('normalizes payloads before saving and updates the URL', () => {
    saveGeneratorState({
      prefix: 'Share',
      suffix: 'Logo',
      font: 'Lora',
      fontSize: '120',
      transparentBg: '1',
      reverseHighlight: 'no',
      postfixBgColor: '#123456',
      extraneous: 'ignore-me'
    });

    const saved = JSON.parse(window.localStorage.getItem(GENERATOR_STATE_STORAGE_KEY));
    expect(saved.fontSize).toBe(120);
    expect(saved.transparentBg).toBe(true);
    expect(saved.reverseHighlight).toBe(false);
    expect(saved.extraneous).toBeUndefined();

    expect(window.location.search).toContain('prefix=Share');
    expect(window.location.search).toContain('reverseHighlight=0');
  });

  it('no-ops when window APIs are unavailable', () => {
    const originalWindow = window;
    // eslint-disable-next-line no-global-assign
    window = undefined;

    expect(loadGeneratorState()).toEqual({});
    expect(() => saveGeneratorState({ prefix: 'SSR' })).not.toThrow();

    // eslint-disable-next-line no-global-assign
    window = originalWindow;
  });

  it('ignores null, empty, or non-string values', () => {
    saveGeneratorState({
      prefix: 'Keep',
      suffix: '',
      transparentBg: null,
      postfixBgColor: 123
    });

    const saved = JSON.parse(window.localStorage.getItem(GENERATOR_STATE_STORAGE_KEY));
    expect(saved.prefix).toBe('Keep');
    expect(saved.suffix).toBe('');
    expect(saved.transparentBg).toBeUndefined();
    expect(saved.postfixBgColor).toBeUndefined();

    window.history.replaceState(null, '', '/?reverseHighlight=&fontSize=');
    const state = loadGeneratorState();
    expect(state.reverseHighlight).toBeUndefined();
    expect(state.fontSize).toBeUndefined();
  });

  it('skips invalid storage payloads', () => {
    window.localStorage.setItem(
      GENERATOR_STATE_STORAGE_KEY,
      JSON.stringify({
        prefix: 123,
        suffix: 'Share',
        fontSize: 'huge'
      })
    );
    const state = loadGeneratorState();
    expect(state.prefix).toBeUndefined();
    expect(state.suffix).toBe('Share');
    expect(state.fontSize).toBeUndefined();
  });

  it('handles malformed JSON in storage as empty state', () => {
    window.localStorage.setItem(GENERATOR_STATE_STORAGE_KEY, '"no-object"');
    expect(loadGeneratorState()).toEqual({});
  });
});
