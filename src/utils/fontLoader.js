const loadedFonts = new Set();
const pendingFonts = new Set();
const hasDOM = typeof window !== 'undefined' && typeof document !== 'undefined';

const buildFontUrl = (fontName) => {
  const family = fontName.trim().split(/\s+/).join('+');
  return `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
};

export function loadGoogleFont(fontName) {
  if (!hasDOM) return;
  const normalized = fontName?.trim();
  if (!normalized || loadedFonts.has(normalized) || pendingFonts.has(normalized)) return;

  const href = buildFontUrl(normalized);
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  link.crossOrigin = 'anonymous';
  link.onload = () => {
    link.rel = 'stylesheet';
    pendingFonts.delete(normalized);
    loadedFonts.add(normalized);
  };
  link.onerror = () => {
    pendingFonts.delete(normalized);
    link.remove();
  };

  pendingFonts.add(normalized);
  document.head.appendChild(link);
}
