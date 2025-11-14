import { describe, it, expect } from 'vitest';
import { fonts } from '@/config/fonts';

describe('fonts config', () => {
  it('exports a de-duplicated, trimmed list', () => {
    expect(fonts.length).toBe(new Set(fonts).size);
    expect(fonts.every((font) => font === font.trim())).toBe(true);
    expect(fonts).toContain('Roboto');
    expect(fonts).not.toContain('Roboto ');
  });
});
