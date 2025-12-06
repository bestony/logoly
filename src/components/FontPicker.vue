<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
// biome-ignore lint/correctness/noUnusedImports: used in template
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'

type WebFont = {
  family: string
  variants: string[]
  files: Record<string, string>
  category?: string
  axes?: { tag: string; min: number; max: number }[]
}

type FontOption = { label: string; value: string }
type FontGroup = { category: string; fonts: FontOption[] }

const props = defineProps<{
  modelValue?: string
  variant?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update:variant', value: string): void
  (e: 'font-change', value: { family: string; variant: string }): void
}>()

const { t } = useI18n()
const apiKey = import.meta.env.VITE_GOOGLE_FONT_KEY

const fonts = ref<WebFont[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const selectedFamily = ref(props.modelValue ?? '')
const selectedVariant = ref(props.variant ?? 'regular')
const loadedFonts = new Set<string>()

const currentFont = computed(
  () => fonts.value.find((font) => font.family === selectedFamily.value) ?? null,
)

const flatOptions = computed<FontOption[]>(() =>
  fonts.value.map((font) => ({ label: font.family, value: font.family })),
)

// biome-ignore lint/correctness/noUnusedVariables: used in template
const groupedOptions = computed<FontGroup[]>(() => {
  const map = new Map<string, FontGroup>()
  fonts.value.forEach((font) => {
    const category = (font.category || 'Other').toUpperCase()
    if (!map.has(category)) {
      map.set(category, { category, fonts: [] })
    }
    map.get(category)?.fonts.push({ label: font.family, value: font.family })
  })
  return Array.from(map.values()).sort((a, b) => a.category.localeCompare(b.category))
})

// biome-ignore lint/correctness/noUnusedVariables: used in template
const selectedOption = computed({
  get: () => flatOptions.value.find((item) => item.value === selectedFamily.value) ?? null,
  set: (option: FontOption | null) => {
    selectedFamily.value = option?.value ?? ''
  },
})

const variantOptions = computed(() => {
  if (!currentFont.value) {
    return []
  }

  const variants = [...currentFont.value.variants]

  if (currentFont.value.files.variable && !variants.includes('variable')) {
    variants.unshift('variable')
  }

  if (currentFont.value.files.regular && !variants.includes('regular')) {
    variants.unshift('regular')
  }

  return Array.from(new Set(variants))
})

// biome-ignore lint/correctness/noUnusedVariables: used in template
const fontCountLabel = computed(() =>
  t('component.fontPicker.count', { count: fonts.value.length }),
)

const detectFormat = (url: string) => {
  if (url.endsWith('.woff2')) {
    return 'woff2'
  }
  if (url.endsWith('.woff')) {
    return 'woff'
  }
  if (url.endsWith('.ttf')) {
    return 'truetype'
  }

  return 'opentype'
}

const parseVariantMeta = (variant: string) => {
  if (variant === 'variable') {
    return { style: 'normal', weight: '100 900' }
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

const loadFont = async (family: string, variant: string) => {
  if (!currentFont.value) {
    return
  }

  const key = `${family}-${variant}`
  const fileUrl =
    currentFont.value.files[variant] ??
    currentFont.value.files.regular ??
    Object.values(currentFont.value.files)[0]

  if (!fileUrl) {
    error.value = t('component.fontPicker.fetchError')
    return
  }

  if (loadedFonts.has(key)) {
    emit('update:modelValue', family)
    emit('update:variant', variant)
    emit('font-change', { family, variant })
    return
  }

  const { style, weight } = parseVariantMeta(variant)
  const format = detectFormat(fileUrl)
  const fontFace = new FontFace(family, `url(${fileUrl}) format('${format}')`, {
    style,
    weight,
    display: 'swap',
  })

  try {
    await fontFace.load()
    document.fonts.add(fontFace)
    loadedFonts.add(key)
    emit('update:modelValue', family)
    emit('update:variant', variant)
    emit('font-change', { family, variant })
    error.value = null
  } catch (err) {
    console.error(err)
    error.value = t('component.fontPicker.fetchError')
  }
}

const fetchFonts = async () => {
  if (!apiKey) {
    error.value = t('component.fontPicker.missingKey')
    return
  }

  isLoading.value = true
  error.value = null

  try {
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`,
    )

    if (!response.ok) {
      throw new Error('Failed to load font list')
    }

    const payload = (await response.json()) as { items: WebFont[] }
    fonts.value = payload.items ?? []

    const firstFamily = fonts.value[0]?.family
    if (!selectedFamily.value && firstFamily) {
      selectedFamily.value = firstFamily
    }

    if (selectedFamily.value && selectedVariant.value) {
      void loadFont(selectedFamily.value, selectedVariant.value)
    }
  } catch (err) {
    console.error(err)
    error.value = t('component.fontPicker.fetchError')
  } finally {
    isLoading.value = false
  }
}

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      selectedFamily.value = value
    }
  },
)

watch(
  () => props.variant,
  (value) => {
    if (value) {
      selectedVariant.value = value
    }
  },
)

watch(
  currentFont,
  (font) => {
    if (!font) {
      return
    }

    if (!variantOptions.value.includes(selectedVariant.value)) {
      selectedVariant.value = variantOptions.value[0] ?? 'regular'
    }
  },
  { immediate: true },
)

watch(
  () => [selectedFamily.value, selectedVariant.value],
  ([family, variant]) => {
    if (!family || !variant || !currentFont.value) {
      return
    }

    void loadFont(family, variant)
  },
  { immediate: false },
)

onMounted(() => {
  void fetchFonts()
})
</script>

<template>


  <div class="fp-grid">
    <label class="fp-label">
      <span>{{ t('component.fontPicker.fontLabel') }}</span>
      <Multiselect
        v-model="selectedOption"
        :options="groupedOptions"
        group-label="category"
        group-values="fonts"
        track-by="value"
        label="label"
        :multiple="false"
        :close-on-select="true"
        :searchable="true"
        :show-labels="false"
        :allow-empty="false"
        :disabled="groupedOptions.length === 0 || isLoading"
        :placeholder="t('component.fontPicker.searchPlaceholder')"
        aria-label="font picker"
        :max-height="320"
      />
    </label>

    <label class="fp-label">
      <span>{{ t('component.fontPicker.variantLabel') }}</span>
      <select
        v-model="selectedVariant"
        class="fp-input"
        :disabled="variantOptions.length === 0 || isLoading"
      >
        <option v-for="variant in variantOptions" :key="variant" :value="variant">
          {{ variant }}
        </option>
      </select>
    </label>
  </div>


    <p v-if="error" class="fp-error">
      {{ error }}
    </p>

</template>

<style scoped>
.fp-grid {
  margin-top: 4px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}

.fp-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: #e8e8e8;
  letter-spacing: 0.01em;
}

.fp-input {
  height: 40px;
  border-radius: 12px;
  border: 1px solid #2d2d2d;
  background: #0f0f0f;
  padding: 0 12px;
  font-size: 13px;
  color: #f6f6f6;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.fp-input:focus {
  border-color: #ff9900;
  box-shadow: 0 0 0 1px #ff9900;
}

.fp-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.fp-note {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px dashed #3d3d3d;
  background: #262626;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 12px;
  color: #c5c5c5;
}

.fp-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #2dd4bf;
}

.fp-error {
  margin-top: 10px;
  color: #f87171;
  font-size: 13px;
}

:deep(.multiselect) {
  background: #0f0f0f !important;
  border: 1px solid #2d2d2d !important;
  border-radius: 12px;
  min-height: 40px;
  box-shadow: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  font-family: var(--logoly-font-family, 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif);
}

:deep(.multiselect__tags) {
  border: none;
  background: transparent;
  padding: 0 12px;
  min-height: 40px;
  display: flex;
  align-items: center;
  color: #f6f6f6;
}

:deep(.multiselect__single) {
  color: #f6f6f6;
  background: transparent;
}

:deep(.multiselect__input) {
  background: transparent;
  color: #f4f4f4;
}

:deep(.multiselect__placeholder) {
  color: #d2d6de;
}

:deep(.multiselect__select) {
  border: none;
  width: 36px;
  height: 40px;
  background: transparent;
}

:deep(.multiselect__content-wrapper) {
  background: #0f0f0f;
  border: 1px solid #2d2d2d;
  border-radius: 12px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35);
}

:deep(.multiselect__group) {
  padding: 6px 12px;
  color: #c5cad4;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

:deep(.multiselect__option) {
  background: #121212;
  color: #f7f7f7;
  padding: 10px 14px;
}

:deep(.multiselect__option--highlight),
:deep(.multiselect__option--highlight.multiselect__option--selected) {
  background: #ff9f1a;
  color: #0b0b0b;
}

:deep(.multiselect__option--selected) {
  background: #1c1c1c;
  color: #ff9900;
}

:deep(.multiselect__option--disabled) {
  color: #6b7280;
}

:deep(.multiselect:focus-within),
:deep(.multiselect.multiselect--active) {
  border-color: #ff9900 !important;
  box-shadow: 0 0 0 1px #ff9900;
}
</style>
