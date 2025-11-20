/**
 * Initialize Microsoft Clarity when running in production with a valid project id.
 * A small queue is created until the Clarity script finishes loading.
 */
export const initClarity = (projectId?: string, isProd: boolean = import.meta.env.PROD) => {
  if (!isProd || !projectId) {
    return
  }

  // Avoid inserting multiple tags if the initializer runs more than once.
  if (window.clarity) {
    return
  }

  ;((c, l, a, r, i) => {
    // Create a small queue until the remote script is ready.
    const queue: ClarityQueue = []
    const clarity = (...args: unknown[]) => {
      queue.push(args)
    }
    clarity.q = queue
    c[a] = clarity

    const scriptEl = l.createElement(r)
    scriptEl.async = true
    scriptEl.src = `https://www.clarity.ms/tag/${i}`

    const firstScript = l.getElementsByTagName(r)[0]
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(scriptEl, firstScript)
    } else {
      l.head.appendChild(scriptEl)
    }
  })(window as ClarityWindow, document, 'clarity', 'script', projectId)
}

type ClarityQueue = typeof window.clarity extends (...args: infer P) => unknown ? P[] : unknown[]

interface ClarityWindow extends Window {
  clarity?: ((...args: unknown[]) => void) & { q?: ClarityQueue | undefined }
}
