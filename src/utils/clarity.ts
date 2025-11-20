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

  ;((win: ClarityWindow, doc: Document, project) => {
    // Create a small queue until the remote script is ready.
    const queue: ClarityQueue = []
    const clarity = (...args: unknown[]) => {
      queue.push(args)
    }
    clarity.q = queue
    win.clarity = clarity

    const scriptEl = doc.createElement('script') as HTMLScriptElement
    scriptEl.async = true
    scriptEl.src = `https://www.clarity.ms/tag/${project}`

    const firstScript = doc.getElementsByTagName('script')[0]
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(scriptEl, firstScript)
    } else {
      doc.head.appendChild(scriptEl)
    }
  })(window as ClarityWindow, document, projectId)
}

type ClarityQueue = typeof window.clarity extends (...args: infer P) => unknown ? P[] : unknown[]

interface ClarityWindow extends Window {
  clarity?: ((...args: unknown[]) => void) & { q?: ClarityQueue | undefined }
}
