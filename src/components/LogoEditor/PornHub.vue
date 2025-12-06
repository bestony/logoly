<template>
  <div class="container">
    <div
      class="preview-card"
      :style="{ backgroundColor: isTransparentBg ? 'transparent' : previewBgColor }"
    >
      <div ref="captureEl" class="logo-wrapper" :style="{ fontFamily: activeFontFamily }">
        <span
          ref="leftEl"
          class="text-part left-text"
          contenteditable="true"
          spellcheck="false"
          :style="{
            color: leftTextColor,
            backgroundColor: leftBgColor,
          }"
          @input="onLeftInput"
        ></span>

        <span
          ref="rightEl"
          class="text-part right-text"
          :style="{
            backgroundColor: themeColor,
            color: rightTextColor,
            border: themeColor === 'transparent' ? '1px dashed #666' : 'none',
          }"
          contenteditable="true"
          spellcheck="false"
          @input="onRightInput"
        ></span>
      </div>
    </div>

    <div class="controls">
      <div class="control-group">
        <p class="group-title">字体 Font</p>
        <FontPicker
          v-model="fontFamily"
          v-model:variant="fontVariant"
          @font-change="handleFontChange"
        />
      </div>

      <div class="control-group">
        <p class="group-title">文本颜色</p>
        <div class="control-grid">
          <label class="color-picker-label">
            左侧背景
            <input type="color" v-model="leftBgColor" class="color-input" />
          </label>
          <label class="color-picker-label">
            左侧文字颜色
            <input type="color" v-model="leftTextColor" class="color-input" />
          </label>
          <label class="color-picker-label">
            右侧背景
            <input type="color" v-model="themeColor" class="color-input" />
          </label>
          <label class="color-picker-label">
            右侧文字颜色
            <input type="color" v-model="rightTextColor" class="color-input" />
          </label>

        </div>
      </div>

      <div class="control-group">
        <p class="group-title">画布背景色</p>
        <div class="control-grid background-grid">
          <label class="color-picker-label" :class="{ disabled: isTransparentBg }">
            画布背景
            <input
              type="color"
              v-model="previewBgColor"
              class="color-input"
              :disabled="isTransparentBg"
            />
          </label>
          <label class="toggle">
            <input v-model="isTransparentBg" type="checkbox" />
            <span>透明画布背景（导出 PNG / SVG 可透明）</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

// biome-ignore lint/correctness/noUnusedImports: used in template
import FontPicker from '@/components/FontPicker.vue'

// 1. 定义响应式状态
const leftText = ref('edit')
const rightText = ref('me')
// biome-ignore lint/correctness/noUnusedVariables: used in template
const themeColor = ref('#ff9900') // 经典的橙色 hex
// biome-ignore lint/correctness/noUnusedVariables: used in template
const rightTextColor = ref('#000000')
// biome-ignore lint/correctness/noUnusedVariables: used in template
const leftTextColor = ref('#ffffff')
// biome-ignore lint/correctness/noUnusedVariables: used in template
const leftBgColor = ref('#000000')
const previewBgColor = ref('#000000')
const isTransparentBg = ref(false)
const fontFamily = ref('')
const fontVariant = ref('regular')
const captureEl = ref<HTMLElement | null>(null)
const leftEl = ref<HTMLElement | null>(null)
const rightEl = ref<HTMLElement | null>(null)
const getDownloadOptions = () => ({
  pixelRatio: 2,
  backgroundColor: isTransparentBg.value ? 'transparent' : previewBgColor.value,
  quality: 0.92,
})

// biome-ignore lint/correctness/noUnusedVariables: used in template
const activeFontFamily = computed(() =>
  fontFamily.value?.length ? `${fontFamily.value}, sans-serif` : 'var(--logoly-font-family)',
)

// biome-ignore lint/correctness/noUnusedVariables: used in template
const handleFontChange = (payload: { family: string; variant: string }) => {
  fontFamily.value = payload.family
  fontVariant.value = payload.variant
}

// 避免 Vue 重新渲染 contenteditable 导致光标跳到开头，初始内容手动写入
onMounted(() => {
  if (leftEl.value) {
    leftEl.value.textContent = leftText.value
  }

  if (rightEl.value) {
    rightEl.value.textContent = rightText.value
  }
})

// 2. 处理 contenteditable 的输入更新
// 注意：contenteditable 元素不支持 v-model，需要手动监听 input 事件
// biome-ignore lint/correctness/noUnusedVariables: used in template
const onLeftInput = (e: Event) => {
  const target = e.target as HTMLElement | null
  leftText.value = target?.innerText ?? ''
}

// biome-ignore lint/correctness/noUnusedVariables: used in template
const onRightInput = (e: Event) => {
  const target = e.target as HTMLElement | null
  rightText.value = target?.innerText ?? ''
}

defineExpose({ captureEl, getDownloadOptions })
</script>

<style scoped>
/* 使用全局字体变量，FontPicker 选择后会更新 */

/* 卡片容器样式 */
.preview-card {
  border: 1px solid #1f1f1f;
  border-radius: 14px;
  padding: 56px 72px;
  background: radial-gradient(circle at 30% 20%, #1b1b1b 0%, #0c0c0c 55%, #070707 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
}

/* Logo 核心布局 */
.logo-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 60px; /* 根据需要调整大小 */
  font-weight: 700;
  line-height: 1;
  gap: 0; /* 使用 margin 确保导出与预览一致 */
  width: fit-content;
}

/* 通用文字样式 */
.text-part {
  outline: none; /* 去除编辑时的蓝色边框 */
  min-width: 10px; /* 防止删光文字后无法点击 */
  white-space: nowrap; /* 防止换行 */
  cursor: text;
}

/* 左侧文字 */
.left-text {
  color: #fff;
  margin-right: 6px; /* 与预览保持一致且兼容 html-to-image */
}

/* 右侧文字 (带背景的) */
.right-text {
  color: #000;
  padding: 4px 10px; /* 上下左右的内边距 */
  border-radius: 6px; /* 圆角 */
  transition: background-color 0.2s;
}

/* 底部控制器样式 */
.controls {
  background: #0f0f0f;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #1f1f1f;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45);
}

.color-picker-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #e6e6e6;
  cursor: pointer;
}

.color-input {
  border: 1px solid #2d2d2d;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: #0b0b0b;
  border-radius: 8px;
  padding: 2px;
  box-shadow: 0 0 0 1px transparent;
}

.color-input:focus-visible {
  border-color: #ff9900;
  box-shadow: 0 0 0 1px #ff9900;
}

.control-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 12px;
  align-items: center;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* padding: 12px 14px; */
  /* border-radius: 10px; */
  /* background: #151515; */
  /* border: 1px solid #1f1f1f; */
}

.group-title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #ffad33;
  letter-spacing: 0.01em;
}

.toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #d8d8d8;
  cursor: pointer;
  user-select: none;
}

.toggle input {
  width: 16px;
  height: 16px;
  accent-color: #ff9900;
}

.disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
