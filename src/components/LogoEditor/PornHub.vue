<template>
  <div class="container">
    <div
      class="preview-card"
      :style="{ backgroundColor: isTransparentBg ? 'transparent' : previewBgColor }"
    >
      <div ref="captureEl" class="logo-wrapper">
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
import { onMounted, ref } from 'vue'

// 1. 定义响应式状态
const leftText = ref('edit')
const rightText = ref('me')
// biome-ignore lint/correctness/noUnusedVariables: used in template
const themeColor = ref('#ff9900') // 经典的橙色 hex
const rightTextColor = ref('#000000')
const leftTextColor = ref('#ffffff')
const leftBgColor = ref('#000000')
const previewBgColor = ref('#000000')
const isTransparentBg = ref(false)
const captureEl = ref<HTMLElement | null>(null)
const leftEl = ref<HTMLElement | null>(null)
const rightEl = ref<HTMLElement | null>(null)
const getDownloadOptions = () => ({
  pixelRatio: 2,
  backgroundColor: isTransparentBg.value ? 'transparent' : previewBgColor.value,
  quality: 0.92,
})

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
/* 引入类似字体，Arial 或 Helvetica 都可以，为了效果好通常加粗 */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap");

/* 卡片容器样式 */
.preview-card {
  border: 1px solid #333;
  border-radius: 12px;
  padding: 60px 80px;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

/* Logo 核心布局 */
.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px; /* 根据需要调整大小 */
  font-weight: 700;
  line-height: 1;
  gap: 4px; /* 两个单词之间的微小间距 */
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
  background: #333;
  padding: 14px 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.color-picker-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #ccc;
  cursor: pointer;
}

.color-input {
  border: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: none;
}

.control-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 10px;
  align-items: center;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.group-title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #f5f5f5;
}

.toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #ccc;
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
