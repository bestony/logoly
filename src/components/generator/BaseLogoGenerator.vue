<template>
  <div class="logo-generator">
    <v-tooltip text="Edit the text to create your own logo" location="top" model-value>
      <template v-slot:activator="{ props }">
        <div v-bind="props" class="box">
          <div
            class="editarea"
            id="logo"
            :style="{
              'font-size': fontSize + 'px',
              'background-color': transparentBgColor,
              'font-family': store.font
            }"
          >
            <slot name="logo-content" v-bind="logoProps" />
          </div>
        </div>
      </template>
    </v-tooltip>

    <div class="customize mt-3">
      <slot name="color-controls" v-bind="colorControlProps" />
      <slot name="misc-controls" v-bind="miscControlProps" />
    </div>

    <div class="download-share">
      <ExportBtn />
      <v-btn @click="twitter" color="#1da1f2">
        <v-icon icon="mdi-twitter" class="mr-0.5"></v-icon> Tweet
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useLogoGenerator } from '@/composables/useLogoGenerator';
import ExportBtn from '@/components/ExportBtn.vue';

const props = defineProps({
  defaultColors: {
    type: Object,
    default: () => ({})
  }
});

const {
  prefixColor,
  suffixColor,
  postfixBgColor,
  fontSize,
  transparentBg,
  reverseHighlight,
  store,
  updatePrefix,
  updateSuffix,
  twitter,
  transparentBgColor
} = useLogoGenerator(props.defaultColors);

const logoProps = computed(() => ({
  prefixColor: prefixColor.value,
  suffixColor: suffixColor.value,
  postfixBgColor: postfixBgColor.value,
  reverseHighlight: reverseHighlight.value,
  store,
  updatePrefix,
  updateSuffix
}));

const colorControlProps = computed(() => ({
  prefixColor: prefixColor.value,
  suffixColor: suffixColor.value,
  postfixBgColor: postfixBgColor.value,
  transparentBg: transparentBg.value,
  updatePrefixColor: (val) => prefixColor.value = val,
  updateSuffixColor: (val) => suffixColor.value = val,
  updatePostfixBgColor: (val) => postfixBgColor.value = val,
  updateTransparentBg: (val) => transparentBg.value = val
}));

const miscControlProps = computed(() => ({
  fontSize: fontSize.value,
  reverseHighlight: reverseHighlight.value,
  updateFontSize: (val) => fontSize.value = val,
  updateReverseHighlight: (val) => reverseHighlight.value = val
}));
</script>

<style lang="stylus" scoped>
.logo-generator
  display flex
  flex-direction column
  align-items center

.box
  border 1px solid #333
  border-radius 10px
  padding 40px
  margin 40px 10px
  max-width 100%

  .editarea
    padding 20px
    text-align center
    font-size 60px
    font-weight 700

.customize
  display flex
  justify-content space-around
  width 100%
  margin-bottom 50px

.download-share
  display flex
  justify-content space-around
  width 80%

  & > div
    width 100px
    height 40px
    border-radius 3px
    line-height 40px
    text-align center
    cursor pointer
</style>