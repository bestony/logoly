class MemoryStorage {
  private store: Record<string, string> = {}

  get length() {
    return Object.keys(this.store).length
  }

  clear() {
    this.store = {}
  }

  getItem(key: string) {
    return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value)
  }

  removeItem(key: string) {
    delete this.store[key]
  }

  key(index: number) {
    return Object.keys(this.store)[index] ?? null
  }
}

const storage = new MemoryStorage()

Object.defineProperty(globalThis, 'localStorage', {
  value: storage,
  configurable: true,
  writable: true,
})

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: storage,
    configurable: true,
    writable: true,
  })

  if (window.history) {
    Object.defineProperty(globalThis, 'history', {
      value: window.history,
      configurable: true,
      writable: true,
    })
  }
}

const originalFetch = globalThis.fetch

if (typeof originalFetch === 'function') {
  const emptyFontsResponse = new Response(JSON.stringify({ items: [] }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })

  globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url

    if (url.includes('/api/fonts')) {
      return Promise.resolve(emptyFontsResponse.clone())
    }

    return originalFetch(input as RequestInfo, init)
  }) as typeof fetch
}

export {}
