import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useStore } from '../store';

describe('Store', () => {
  beforeEach(() => {
    // Create a fresh pinia instance for each test
    setActivePinia(createPinia());
  });

  it('initializes with default values', () => {
    const store = useStore();
    
    expect(store.prefix).toBe('edit');
    expect(store.suffix).toBe('me');
    expect(store.font).toBe('Roboto');
    expect(store.editable).toBe(true);
  });

  it('updates prefix text', () => {
    const store = useStore();
    
    store.updatePrefix('Hello');
    expect(store.prefix).toBe('Hello');
  });

  it('updates suffix text', () => {
    const store = useStore();
    
    store.updateSuffix('World');
    expect(store.suffix).toBe('World');
  });

  it('updates both prefix and suffix independently', () => {
    const store = useStore();
    
    store.updatePrefix('Porn');
    store.updateSuffix('hub');
    
    expect(store.prefix).toBe('Porn');
    expect(store.suffix).toBe('hub');
  });
});