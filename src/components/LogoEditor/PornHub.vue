<template>
  <div class="container">
    <div class="preview-card" :style="previewCardStyle">
      <div
        ref="captureEl"
        class="logo-wrapper"
        :style="{
          fontFamily: activeFontFamily,
          fontSize: fontSizePx,
          backgroundColor: captureBgColor,
        }"
      >
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
        <p class="group-title">{{ t('component.pornhub.fontFamily') }}</p>
        <FontPicker
          v-model="fontFamily"
          v-model:variant="fontVariant"
          @font-change="handleFontChange"
        />
      </div>

      <div class="control-group">
        <p class="group-title">{{ t('component.pornhub.fontSize') }}</p>
        <div class="slider-row">
          <input
            v-model.number="fontSize"
            type="range"
            min="24"
            max="160"
            step="1"
            class="font-size-slider"
            aria-label="font-size"
          />
          <span class="slider-value">{{ fontSize }}px</span>
        </div>
      </div>

      <div class="control-group">
        <p class="group-title">{{ t('component.pornhub.textColor') }}</p>
        <div class="control-grid">
          <label class="toggle left-bg-toggle">
            <input v-model="isLeftBgVisible" type="checkbox" />
            <span>{{ t('component.pornhub.leftBgToggle') }}</span>
          </label>
          <label v-if="isLeftBgVisible" class="color-picker-label">
            {{ t('component.pornhub.leftBg') }}
            <input type="color" v-model="leftBgColor" class="color-input" />
          </label>
          <label class="color-picker-label">
            {{ t('component.pornhub.leftTextColor') }}
            <input type="color" v-model="leftTextColor" class="color-input" />
          </label>
          <label class="color-picker-label">
            {{ t('component.pornhub.rightBg') }}
            <input type="color" v-model="themeColor" class="color-input" />
          </label>
          <label class="color-picker-label">
            {{ t('component.pornhub.rightTextColor') }}
            <input type="color" v-model="rightTextColor" class="color-input" />
          </label>

        </div>
      </div>

      <div class="control-group">
        <p class="group-title">{{ t('component.pornhub.canvas') }}</p>
        <div class="control-grid background-grid">
          <label class="toggle">
            <input v-model="isPureBlackPreview" type="checkbox" />
            <span>{{ t('component.pornhub.pureBlackPreview') }}</span>
          </label>
          <label class="color-picker-label" :class="isTransparentBg ? 'disabled' : ''">
            {{ t('component.pornhub.canvasBg') }}
            <input
              type="color"
              v-model="previewBgColor"
              class="color-input"
              :disabled="isTransparentBg"
            />
          </label>
          <label class="toggle">
            <input v-model="isTransparentBg" type="checkbox" />
            <span>{{ t('component.pornhub.transparentHint') }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

// biome-ignore lint/correctness/noUnusedImports: used in template
import FontPicker from '@/components/FontPicker.vue'
import { useLogoEditor } from '@/composables/useLogoEditor'

const { t } = useI18n()

const {
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
} = useLogoEditor({ initialFontSize: 60 })

defineExpose({
  captureEl,
  getDownloadOptions,
  getFileBaseName,
})
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
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.3px;
  gap: 0;
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
  margin-right: 0;
  padding: 6px 0;
}

/* 右侧文字 (带背景的) */
.right-text {
  color: #000;
  padding: 6px 12px; /* 上下左右的内边距 */
  border-radius: 7px; /* 介于 6-8px 之间，更贴近官方比例 */
  transform: translateX(10px); /* 微调字距，避免导出裁切 margin */
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

.slider-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.font-size-slider {
  flex: 1;
  accent-color: #ff9900;
}

.slider-value {
  width: 58px;
  text-align: right;
  color: #f5f5f5;
  font-variant-numeric: tabular-nums;
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

.left-bg-toggle {
  padding: 10px 12px;
  border: 1px solid #1f1f1f;
  border-radius: 10px;
  background: #141414;
}

.left-bg-toggle span {
  color: #e6e6e6;
}

.disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
