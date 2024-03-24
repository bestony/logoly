import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useStore = defineStore('store', () => {
  const prefix = ref('edit');
  const suffix = ref('me');
  const font = ref('Roboto');
  //Needed for the SVG Export (otherwise you can edit the SVG in the browser which breaks and and leads into new issues)
  const editable = ref(true);

  function updatePrefix(text) {
    prefix.value = text;
  }

  function updateSuffix(text) {
    suffix.value = text;
  }

  return { prefix, suffix, font, editable, updatePrefix, updateSuffix };
});
