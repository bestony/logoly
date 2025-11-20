import type { Ref } from 'vue'

type Guard = () => boolean
type Task = () => Promise<void>

/**
 * Wraps a download task with shared loading + error state handling.
 * Reusable across pages to avoid duplicating toggles and error wiring.
 */
export const useDownloadTask = (isDownloading: Ref<boolean>, errorMessage: Ref<string | null>) => {
  const runDownload = async (guard: Guard, task: Task, failMessage: string) => {
    if (isDownloading.value || !guard()) {
      return
    }

    isDownloading.value = true
    errorMessage.value = null

    try {
      await task()
    } catch (error) {
      console.error(failMessage, error)
      errorMessage.value = failMessage
    } finally {
      isDownloading.value = false
    }
  }

  return { runDownload }
}
