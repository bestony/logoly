import { computed, onMounted, ref, watch } from 'vue'

type DownloadFormat = 'png' | 'jpeg' | 'svg'

type LogoEditorOptions = {
  initialLeft?: string
  initialRight?: string
  initialFontSize?: number
}

export const useLogoEditor = (options: LogoEditorOptions = {}) => {
  const leftText = ref(options.initialLeft ?? 'Edit')
  const rightText = ref(options.initialRight ?? 'me')
  const themeColor = ref('#ff9900')
  const rightTextColor = ref('#000000')
  const leftTextColor = ref('#ffffff')
  const leftBgColor = ref<string>('transparent')
  const lastLeftBgColor = ref('#000000')
  const previewBgColor = ref('#000000')
  const isTransparentBg = ref(false)
  const isPureBlackPreview = ref(true)
  const fontFamily = ref('')
  const fontVariant = ref('regular')
  const fontSize = ref(options.initialFontSize ?? 60)
  const captureEl = ref<HTMLElement | null>(null)
  const leftEl = ref<HTMLElement | null>(null)
  const rightEl = ref<HTMLElement | null>(null)

  const isLeftBgVisible = computed<boolean>({
    get: () => leftBgColor.value !== 'transparent',
    set: (value) => {
      if (value) {
        leftBgColor.value = lastLeftBgColor.value
        return
      }

      lastLeftBgColor.value =
        leftBgColor.value === 'transparent' ? lastLeftBgColor.value : leftBgColor.value
      leftBgColor.value = 'transparent'
    },
  })

  const resolveBg = (format?: DownloadFormat) =>
    isTransparentBg.value && format !== 'jpeg' ? 'transparent' : previewBgColor.value

  const getDownloadOptions = (format?: DownloadFormat) => ({
    pixelRatio: 2,
    backgroundColor: resolveBg(format),
    quality: 0.92,
  })

  const sanitizeFileName = (value: string) => {
    const cleaned = value
      .trim()
      .replace(/\s+/g, '-') // collapse whitespace to single dash
      .replace(/[\\/:*?"<>|]/g, '') // strip illegal path characters
    return cleaned.length ? cleaned : 'logoly'
  }

  const getFileBaseName = () => {
    const leftContent = leftEl.value?.textContent ?? leftText.value ?? ''
    const rightContent = rightEl.value?.textContent ?? rightText.value ?? ''

    return sanitizeFileName(`${leftContent}${rightContent}`)
  }

  const activeFontFamily = computed(() =>
    fontFamily.value?.length
      ? `${fontFamily.value}, sans-serif`
      : "Inter, 'Noto Sans', var(--logoly-font-family), sans-serif",
  )

  const fontSizePx = computed(() => `${fontSize.value}px`)
  const captureBgColor = computed(() => resolveBg())

  const previewCardStyle = computed(() => {
    if (isTransparentBg.value) {
      return { background: 'transparent' }
    }

    if (isPureBlackPreview.value) {
      return { background: '#000000' }
    }

    return { background: previewBgColor.value }
  })

  watch(leftBgColor, (newColor) => {
    if (newColor !== 'transparent') {
      lastLeftBgColor.value = newColor
    }
  })

  const handleFontChange = (payload: { family: string; variant: string }) => {
    fontFamily.value = payload.family
    fontVariant.value = payload.variant
  }

  const syncInitialContent = () => {
    if (leftEl.value) {
      leftEl.value.textContent = leftText.value
    }

    if (rightEl.value) {
      rightEl.value.textContent = rightText.value
    }
  }

  onMounted(syncInitialContent)

  const onLeftInput = (e: Event) => {
    const target = e.target as HTMLElement | null
    leftText.value = target?.textContent ?? ''
  }

  const onRightInput = (e: Event) => {
    const target = e.target as HTMLElement | null
    rightText.value = target?.textContent ?? ''
  }

  return {
    leftText,
    rightText,
    themeColor,
    rightTextColor,
    leftTextColor,
    leftBgColor,
    isLeftBgVisible,
    previewBgColor,
    isTransparentBg,
    isPureBlackPreview,
    fontFamily,
    fontVariant,
    fontSize,
    captureEl,
    leftEl,
    rightEl,
    activeFontFamily,
    fontSizePx,
    captureBgColor,
    previewCardStyle,
    getDownloadOptions,
    getFileBaseName,
    handleFontChange,
    onLeftInput,
    onRightInput,
  }
}
