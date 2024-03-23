import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const prefix = ref('edit')
  const suffix = ref('me')
  const font = ref('Roboto')

  function updatePrefix(text) {
    prefix.value = text;
  }

  function updateSuffix(text) {
    suffix.value = text;
  }

  return { prefix, suffix, font, updatePrefix, updateSuffix }
})
