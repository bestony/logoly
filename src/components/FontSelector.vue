<template>
  <v-select
    hide-details
    v-model="store.font"
    label="Font"
    :items="fonts"
    color="#f90"
    variant="outlined"
  ></v-select>
</template>

<script setup>
import { watch } from 'vue';
import { useStore } from '@/stores/store';
import { loadGoogleFont } from '@/utils/fontLoader';
import { fonts } from '@/config/fonts';

const store = useStore();

watch(
  () => store.font,
  (font) => {
    loadGoogleFont(font);
  },
  { immediate: true }
);
</script>
