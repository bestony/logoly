import type { DownloadOptions } from '@/utils/download'

export const DEFAULT_DOWNLOAD_OPTIONS: DownloadOptions['options'] = {
  pixelRatio: 2,
  backgroundColor: '#000000',
  quality: 0.92,
} as const

export const SIMPLE_TEXT_DOWNLOAD_OPTIONS: DownloadOptions['options'] = {
  pixelRatio: 2,
  backgroundColor: '#050505',
  quality: 0.94,
} as const
