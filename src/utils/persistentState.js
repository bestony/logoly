const GENERATOR_STATE_STORAGE_KEY = 'logoly-generator-state';
const PERSISTED_FIELDS = [
  'prefix',
  'suffix',
  'font',
  'prefixColor',
  'suffixColor',
  'postfixBgColor',
  'fontSize',
  'transparentBg',
  'reverseHighlight'
];

const hasWindow = () => typeof window !== 'undefined';
const hasLocation = () => hasWindow() && typeof window.location !== 'undefined';
const hasHistory = () => hasWindow() && typeof window.history?.replaceState === 'function';
const hasLocalStorage = () => hasWindow() && typeof window.localStorage !== 'undefined';

const isString = (value) => typeof value === 'string';

function parseBoolean(value) {
  if (typeof value === 'boolean') return value;
  const normalized = String(value).trim().toLowerCase();
  if (!normalized) return undefined;
  if (['1', 'true', 'yes', 'y'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'n'].includes(normalized)) return false;
  return undefined;
}

function parseNumber(value) {
  if (value === null || value === undefined || value === '') return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function pickValue(field, value) {
  if (value === undefined || value === null) return undefined;
  switch (field) {
    case 'fontSize': {
      const parsed = parseNumber(value);
      return parsed === undefined ? undefined : parsed;
    }
    case 'transparentBg':
    case 'reverseHighlight': {
      const parsed = parseBoolean(value);
      return typeof parsed === 'boolean' ? parsed : undefined;
    }
    default: {
      if (!isString(value)) return undefined;
      return value;
    }
  }
}

function readFromQuery() {
  if (!hasLocation()) return {};
  const params = new URLSearchParams(window.location.search);
  const state = {};

  PERSISTED_FIELDS.forEach((field) => {
    if (!params.has(field)) return;
    const value = params.get(field);
    const parsed = pickValue(field, value);
    if (parsed !== undefined) {
      state[field] = parsed;
    }
  });

  return state;
}

function readFromStorage() {
  if (!hasLocalStorage()) return {};
  try {
    const raw = window.localStorage.getItem(GENERATOR_STATE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};

    const state = {};
    PERSISTED_FIELDS.forEach((field) => {
      const value = pickValue(field, parsed[field]);
      if (value !== undefined) {
        state[field] = value;
      }
    });
    return state;
  } catch {
    return {};
  }
}

function formatForQuery(value) {
  if (typeof value === 'boolean') {
    return value ? '1' : '0';
  }
  return String(value);
}

function updateQueryString(state) {
  if (!hasLocation() || !hasHistory()) return;

  const params = new URLSearchParams(window.location.search);
  PERSISTED_FIELDS.forEach((field) => params.delete(field));

  Object.entries(state).forEach(([field, value]) => {
    const formatted = formatForQuery(value);
    if (formatted === undefined || formatted === '') return;
    params.set(field, formatted);
  });

  const search = params.toString();
  const newUrl = `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`;
  window.history.replaceState(null, '', newUrl);
}

export function loadGeneratorState() {
  return {
    ...readFromStorage(),
    ...readFromQuery()
  };
}

export function saveGeneratorState(state) {
  const normalized = {};
  PERSISTED_FIELDS.forEach((field) => {
    const value = pickValue(field, state[field]);
    if (value !== undefined) {
      normalized[field] = value;
    }
  });

  if (hasLocalStorage()) {
    try {
      window.localStorage.setItem(GENERATOR_STATE_STORAGE_KEY, JSON.stringify(normalized));
    } catch {
      // ignore quota errors
    }
  }

  updateQueryString(normalized);
}

export { GENERATOR_STATE_STORAGE_KEY };
