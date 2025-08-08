import { ref } from 'vue';
import { defineStore } from 'pinia';
import DOMPurify from 'dompurify';

export const useStore = defineStore('store', () => {
  const prefix = ref('edit');
  const suffix = ref('me');
  const font = ref('Roboto');
  //Needed for the SVG Export (otherwise you can edit the SVG in the browser which breaks and and leads into new issues)
  const editable = ref(true);

  function sanitizeInput(text) {
    // 移除所有 HTML 标签，只保留纯文本
    const sanitized = DOMPurify.sanitize(text, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true
    });
    return sanitized.trim();
  }

  function updatePrefix(text) {
    if (typeof text !== 'string') {
      console.error('Prefix must be a string');
      return;
    }
    prefix.value = sanitizeInput(text);
  }

  function updateSuffix(text) {
    if (typeof text !== 'string') {
      console.error('Suffix must be a string');
      return;
    }
    suffix.value = sanitizeInput(text);
  }

  return { prefix, suffix, font, editable, updatePrefix, updateSuffix };
});
