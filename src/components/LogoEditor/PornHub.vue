<template>
  <div class="container">
    <div class="preview-card">
      <div ref="captureEl" class="logo-wrapper">
        <span class="text-part left-text" contenteditable="true" @input="onLeftInput">
          {{ leftText }}
        </span>

        <span
          class="text-part right-text"
          :style="{ backgroundColor: themeColor }"
          contenteditable="true"
          @input="onRightInput"
        >
          {{ rightText }}
        </span>
      </div>
    </div>

    <div class="controls">
      <label class="color-picker-label">
        Pick a color you like
        <input type="color" v-model="themeColor" class="color-input" />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineExpose, ref } from 'vue'

// 1. 定义响应式状态
const leftText = ref('edit')
const rightText = ref('me')
// biome-ignore lint/correctness/noUnusedVariables: used in template
const themeColor = ref('#ff9900') // 经典的橙色 hex
const captureEl = ref<HTMLElement | null>(null)

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

defineExpose({ captureEl })
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
  padding: 10px 20px;
  border-radius: 8px;
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
</style>
