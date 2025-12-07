<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
// biome-ignore lint/correctness/noUnusedImports: used in template
import FontPicker from '@/components/FontPicker.vue'
import type { DownloadFormat } from '@/utils/download'

const { t, locale } = useI18n()

const captureEl = ref<HTMLElement | null>(null)
const textValue = ref(t('page.simpleText.defaultText'))
const editableEl = ref<HTMLElement | null>(null)
const hasUserEdited = ref(false)
const fontFamily = ref('')
const fontVariant = ref('regular')
const fontSize = ref(88)
const textColor = ref('#f4f4f5')
const previewBgColor = ref('#050505')
const isTransparentBg = ref(false)

const activeFontFamily = computed(() =>
  fontFamily.value?.length
    ? `${fontFamily.value}, var(--logoly-font-family), 'Inter', 'Noto Sans', sans-serif`
    : "Inter, 'Noto Sans', var(--logoly-font-family), sans-serif",
)

const parseVariantMeta = (variant: string) => {
  if (variant === 'variable') {
    return { style: 'normal', weight: '400' }
  }

  if (variant === 'regular') {
    return { style: 'normal', weight: '400' }
  }

  if (variant === 'italic') {
    return { style: 'italic', weight: '400' }
  }

  const weightMatch = variant.match(/\d{3}/)
  const weight = weightMatch?.[0] ?? '400'
  const style = variant.includes('italic') ? 'italic' : 'normal'

  return { style, weight }
}

const variantStyle = computed(() => parseVariantMeta(fontVariant.value))
const fontSizePx = computed(() => `${fontSize.value}px`)

const previewStyle = computed(() => ({
  fontFamily: activeFontFamily.value,
  color: textColor.value,
  fontSize: fontSizePx.value,
  fontWeight: variantStyle.value.weight,
  fontStyle: variantStyle.value.style,
  letterSpacing: '-0.02em',
  textShadow: '0 10px 30px rgba(0, 0, 0, 0.45)',
}))

const previewCardStyle = computed(() => ({
  background: 'radial-gradient(circle at 18% 24%, #1f2937 0%, #0b0c10 45%, #07080d 70%)',
}))

const previewSurfaceStyle = computed(() => ({
  background: isTransparentBg.value ? 'transparent' : previewBgColor.value,
  borderColor: 'rgba(255, 255, 255, 0.05)',
}))

const sanitizeFileName = (value: string) => {
  const cleaned = value
    .trim()
    .replace(/\s+/g, '-') // collapse whitespace
    .replace(/[\\/:*?"<>|]/g, '') // strip illegal characters
  return cleaned.length ? cleaned : 'simple-text'
}

const getFileBaseName = () => sanitizeFileName(textValue.value || t('page.simpleText.defaultText'))

const resolveBg = (format?: DownloadFormat) =>
  isTransparentBg.value && format !== 'jpeg' ? 'transparent' : previewBgColor.value

const getDownloadOptions = (format?: DownloadFormat) => ({
  pixelRatio: 2,
  backgroundColor: resolveBg(format),
  quality: format === 'jpeg' ? 0.92 : 0.94,
})

const handleFontChange = (payload: { family: string; variant: string }) => {
  fontFamily.value = payload.family
  fontVariant.value = payload.variant
}

const markEdited = () => {
  if (!hasUserEdited.value) {
    hasUserEdited.value = true
  }
}

const handleInlineInput = (e: Event) => {
  const target = e.target as HTMLElement | null
  markEdited()
  textValue.value = target?.textContent ?? ''
}

watch(
  () => locale.value,
  () => {
    if (!hasUserEdited.value) {
      textValue.value = t('page.simpleText.defaultText')
    }
  },
)

defineExpose({
  captureEl,
  getDownloadOptions,
  getFileBaseName,
})
</script>

<template>
  <section class="simple-text-editor">
    <div class="preview-stack">
        <div  class="preview-surface" :style="previewSurfaceStyle">
          <div ref="captureEl">
          <span
            ref="editableEl"
            class="preview-text"
            :style="previewStyle"
            contenteditable="true"
            spellcheck="false"
            role="textbox"
            aria-label="Editable text preview"
            @input="handleInlineInput"
            @keydown.enter.prevent
          >
            {{ textValue }}
          </span>
          </div>
        </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div>
          <p class="section-label">{{ t('component.simpleText.controlsTitle') }}</p>
          <p class="section-sub">
            {{ t('component.simpleText.controlsHint') }}
          </p>
        </div>
      </div>

      <div class="grid">
        <label class="field">
          <span class="field-label">{{ t('component.simpleText.fontSize') }}</span>
          <div class="slider-row">
            <input
              v-model.number="fontSize"
              type="range"
              min="24"
              max="180"
              step="1"
              class="slider"
              aria-label="font-size"
            />
            <span class="slider-value">{{ fontSize }}px</span>
          </div>
        </label>

        <label class="field color-field">
          <span class="field-label">{{ t('component.simpleText.textColor') }}</span>
          <div class="color-row">
            <input v-model="textColor" type="color" class="color-input" aria-label="text-color" />
            <span class="color-value">{{ textColor.toUpperCase() }}</span>
          </div>
        </label>

        <label class="field color-field">
          <span class="field-label">{{ t('component.simpleText.previewBg') }}</span>
          <div class="color-row">
            <input
              v-model="previewBgColor"
              type="color"
              class="color-input"
              aria-label="preview-background-color"
              :disabled="isTransparentBg"
            />
            <span class="color-value">{{ previewBgColor.toUpperCase() }}</span>
          </div>
        </label>

        <label class="field toggle-field">
          <span class="field-label">{{ t('component.simpleText.transparent') }}</span>
          <div class="toggle-row">
            <input
              id="transparent-bg"
              v-model="isTransparentBg"
              type="checkbox"
              class="toggle-input"
            />
            <label class="toggle-label" for="transparent-bg">
              {{ t('component.simpleText.transparentHint') }}
            </label>
          </div>
        </label>
      </div>

      <div class="font-card">
        <div class="font-card__head">
          <p class="section-label">{{ t('component.simpleText.fontTitle') }}</p>
          <p class="section-sub">{{ t('component.simpleText.fontHint') }}</p>
        </div>
        <FontPicker
          v-model="fontFamily"
          v-model:variant="fontVariant"
          @font-change="handleFontChange"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.simple-text-editor {
  display: grid;
  gap: 16px;
}

.preview-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-label {
  margin: 0;
  color: #d0d4dc;
  font-weight: 700;
  letter-spacing: 0.02em;
  font-size: 14px;
  text-transform: uppercase;
}

.section-sub {
  margin: 4px 0 0;
  color: #9ca3af;
  font-size: 13px;
}

.preview-card {
  border: 1px solid #1f2937;
  border-radius: 16px;
  padding: 40px 28px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.45);
}

.preview-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 0%, rgba(251, 191, 36, 0.12), transparent 38%),
    linear-gradient(125deg, rgba(96, 165, 250, 0.1), transparent 55%),
    linear-gradient(45deg, rgba(16, 185, 129, 0.08), transparent 50%);
  pointer-events: none;
}

.preview-surface {
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(5, 7, 12, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.preview-text {
  display: inline-block;
  padding: 18px 22px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.01));
}

.panel {
  border: 1px solid #1f2937;
  background: #0c0d11;
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  color: #cdd3dd;
  font-size: 14px;
  letter-spacing: 0.01em;
}

.field-input {
  height: 46px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid #242b38;
  background: #0f1116;
  color: #f5f6f7;
  font-size: 15px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.field-input:focus {
  border-color: #f59e0b;
  box-shadow: 0 0 0 1px #f59e0b;
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.slider {
  flex: 1;
  accent-color: #f59e0b;
}

.slider-value {
  width: 70px;
  text-align: right;
  color: #e5e7eb;
  font-variant-numeric: tabular-nums;
}

.color-field .color-row {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.color-input {
  width: 48px;
  height: 38px;
  border-radius: 12px;
  border: 1px solid #242b38;
  background: #0f1116;
  padding: 6px;
  cursor: pointer;
}

.color-value {
  min-width: 96px;
  color: #e5e7eb;
  font-family:
    'IBM Plex Mono',
    ui-monospace,
    SFMono-Regular,
    Consolas,
    'Liberation Mono',
    monospace;
  font-size: 13px;
}

.toggle-field .toggle-row {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.toggle-input {
  width: 18px;
  height: 18px;
  accent-color: #f59e0b;
}

.toggle-label {
  color: #e5e7eb;
  font-size: 14px;
}

.font-card {
  border: 1px solid #1f2937;
  border-radius: 14px;
  padding: 14px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.font-card__head {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

@media (max-width: 720px) {
  .preview-surface {
    min-height: 180px;
  }

  .preview-card {
    padding: 28px 18px;
  }
}
</style>
