<template>
  <BaseLogoGenerator :default-colors="defaultColors">
    <template #logo-content="{ prefixColor, suffixColor, postfixBgColor, reverseHighlight, store, updatePrefix, updateSuffix }">
      <template v-if="!reverseHighlight">
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
          :style="{ color: suffixColor, 'background-color': postfixBgColor }"
          :contenteditable="store.editable"
          @input="updateSuffix"
          spellcheck="false"
          >{{ store.suffix }}</span
        >
      </template>
      <template v-else>
        <span
          class="postfix"
          :style="{ color: suffixColor, 'background-color': postfixBgColor }"
          :contenteditable="store.editable"
          @input="updatePrefix"
          spellcheck="false"
          >{{ store.prefix }}</span
        >
        <span
          class="prefix"
          @input="updateSuffix"
          :style="{ color: prefixColor }"
          :contenteditable="store.editable"
          spellcheck="false"
        >
          {{ store.suffix }}
        </span>
      </template>
    </template>
    
    <template #color-controls="{ prefixColor, suffixColor, postfixBgColor, transparentBg, updatePrefixColor, updateSuffixColor, updatePostfixBgColor, updateTransparentBg }">
      <v-tooltip text="Pick a color you like" location="top" model-value>
        <template v-slot:activator="{ props }">
          <div v-bind="props" class="customize-color" id="prefixColor">
            <ColorPicker label="Prefix Text Color" :model-value="prefixColor" @update:model-value="updatePrefixColor" />
            <ColorPicker label="Suffix Text Color" :model-value="suffixColor" @update:model-value="updateSuffixColor" />
            <ColorPicker label="Suffix Background Color" :model-value="postfixBgColor" @update:model-value="updatePostfixBgColor" />
            <div class="flex items-center">
              Transparent Background: <v-checkbox-btn :model-value="transparentBg" @update:model-value="updateTransparentBg"></v-checkbox-btn>
            </div>
          </div>
        </template>
      </v-tooltip>
    </template>
    
    <template #misc-controls="{ fontSize, reverseHighlight, updateFontSize, updateReverseHighlight }">
      <div class="customize-misc">
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
        <FontSelector />
        <div class="flex items-center">
          Reverse Highlight: <v-checkbox-btn :model-value="reverseHighlight" @update:model-value="updateReverseHighlight"></v-checkbox-btn>
        </div>
      </div>
    </template>
  </BaseLogoGenerator>
</template>

<script setup>
import BaseLogoGenerator from './BaseLogoGenerator.vue';
import ColorPicker from './ColorPicker.vue';
import FontSelector from '@/components/FontSelector.vue';

const defaultColors = {
  prefix: '#ffffff',
  suffix: '#000000',
  background: '#ff9900'
};
</script>

<style lang="stylus" scoped>
.prefix {
  color: #fff;
  padding: 5px 5px;
}

.postfix {
  color: #000;
  background-color: #f90;
  padding: 5px 10px;
  border-radius: 7px;
}

.customize-color > div,
.customize-misc > div {
  padding: 8px 0;
}
</style>
