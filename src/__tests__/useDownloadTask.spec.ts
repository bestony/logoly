import { ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { useDownloadTask } from '../composables/useDownloadTask'

describe('useDownloadTask', () => {
  it('surfaces guard failure with a helpful message and skips the task', async () => {
    const isDownloading = ref(false)
    const errorMessage = ref<string | null>(null)
    const { runDownload } = useDownloadTask(isDownloading, errorMessage)
    const task = vi.fn()

    await runDownload(() => false, task, 'fail', 'not ready yet')

    expect(task).not.toHaveBeenCalled()
    expect(isDownloading.value).toBe(false)
    expect(errorMessage.value).toBe('not ready yet')
  })

  it('clears previous errors and toggles loading around a successful task', async () => {
    const isDownloading = ref(false)
    const errorMessage = ref<string | null>('stale error')
    const { runDownload } = useDownloadTask(isDownloading, errorMessage)
    const task = vi.fn().mockResolvedValue(undefined)

    await runDownload(() => true, task, 'fail')

    expect(task).toHaveBeenCalledTimes(1)
    expect(isDownloading.value).toBe(false)
    expect(errorMessage.value).toBeNull()
  })

  it('stores the failure message when the task throws', async () => {
    const isDownloading = ref(false)
    const errorMessage = ref<string | null>(null)
    const { runDownload } = useDownloadTask(isDownloading, errorMessage)
    const task = vi.fn().mockRejectedValue(new Error('boom'))
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    await runDownload(() => true, task, 'download failed')

    expect(task).toHaveBeenCalledTimes(1)
    expect(isDownloading.value).toBe(false)
    expect(errorMessage.value).toBe('download failed')
    consoleErrorSpy.mockRestore()
  })

  it('uses the fallback failure message when guard message is missing', async () => {
    const isDownloading = ref(false)
    const errorMessage = ref<string | null>(null)
    const { runDownload } = useDownloadTask(isDownloading, errorMessage)
    const guard = vi.fn().mockReturnValue(false)

    await runDownload(guard, vi.fn(), 'generic failure')

    expect(errorMessage.value).toBe('generic failure')
  })

  it('skips execution when a download is already in progress', async () => {
    const isDownloading = ref(true)
    const errorMessage = ref<string | null>(null)
    const guard = vi.fn().mockReturnValue(true)
    const task = vi.fn()
    const { runDownload } = useDownloadTask(isDownloading, errorMessage)

    await runDownload(guard, task, 'fail')

    expect(guard).not.toHaveBeenCalled()
    expect(task).not.toHaveBeenCalled()
    expect(isDownloading.value).toBe(true)
  })
})
