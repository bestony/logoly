<template>
  <BaseLogoGenerator :default-colors="defaultColors">
    <template #logo-content="{ prefixColor, suffixColor, postfixBgColor, store, updatePrefix, updateSuffix }">
      <span
        @input="updatePrefix"
        class="prefix"
        :style="{ color: prefixColor }"
        :contenteditable="store.editable"
        spellcheck="false"
      >
        {{ store.prefix }}
      </span>
      <!-- HACK: meaningless text: ".", just to split input area, see: #269 -->
      <span style="font-size: 0">.</span>
      <span
        class="postfix"
        :style="{
          color: suffixColor,
          'background-color': postfixBgColor,
          'margin-left': suffixMargin
        }"
        :contenteditable="store.editable"
        @input="updateSuffix"
        spellcheck="false"
        >{{ store.suffix }}</span
      >
    </template>
    
    <template #color-controls>
      <div></div>
    </template>
    
    <template #misc-controls="{ fontSize, updateFontSize }">
      <div class="w-1/3">
        <div class="flex flex-col">
          Font Size: {{ fontSize }}px
          <div class="-ml-1">
            <v-slider
              hide-details
              min="30"
              max="200"
              step="1"
              color="#f90"
              :model-value="fontSize"
              @update:model-value="updateFontSize"
            ></v-slider>
          </div>
        </div>
        <div class="flex items-center">
          Transparent Background: <v-checkbox-btn :model-value="localTransparentBg" @update:model-value="localTransparentBg = $event"></v-checkbox-btn>
        </div>
      </div>
    </template>
  </BaseLogoGenerator>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useStore } from '@/stores/store';
import { useLogoGenerator } from '@/composables/useLogoGenerator';
import BaseLogoGenerator from './BaseLogoGenerator.vue';

const defaultColors = {
  prefix: '#ffffff',
  suffix: '#00AFF0',
  background: 'transparent'
};

const { fontSize } = useLogoGenerator(defaultColors);
const localTransparentBg = ref(false);

const suffixMargin = computed(() => {
  return '-' + fontSize.value / 30 + 'rem';
});

const store = useStore();

onMounted(() => {
  store.updatePrefix('Only');
  store.updateSuffix('Fans');
});

onBeforeUnmount(() => {
  store.updatePrefix('edit');
  store.updateSuffix('me');
});
</script>

<style lang="stylus" scoped>
.prefix {
  color: #fff;
  padding: 5px 5px;
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 200;
  font-style: normal;
}

.postfix {
  color: #000;
  background-color: transparent;
  padding: 5px 10px;
  margin-left: -2rem;
  font-family: "Arizonia", cursive;
  font-weight: 400;
  font-style: normal;
}
</style>
