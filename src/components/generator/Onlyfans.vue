<template>
  <div class="flex flex-col items-center">
    <v-tooltip text="Edit the text to create your own logo" model-value location="top">
      <template v-slot:activator="{ props }">
        <div v-bind="props" class="box">
          <div
            class="editarea"
            id="logo"
            :style="{
              'font-size': fontSize + 'px',
              'background-color': transparentBgColor
            }"
          >
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
                'background-color': '#00AFF0',
                'margin-left': suffixMargin + 10
              }"
              :contenteditable="store.editable"
              @input="updateSuffix"
              spellcheck="false"
              >{{ store.suffix }}</span
            >
          </div>
        </div>
      </template>
    </v-tooltip>

    <div class="w-1/3 mb-12">
      <div class="flex flex-col">
        Font Size: {{ fontSize }}px
        <div class="-ml-1">
          <v-slider
            hide-details
            min="30"
            max="200"
            step="1"
            color="#f90"
            v-model="fontSize"
          ></v-slider>
        </div>
      </div>
      <div class="flex items-center">
        Transparent Background: <v-checkbox-btn v-model="transparentBg"></v-checkbox-btn>
      </div>
    </div>

    <div class="download-share">
      <ExportBtn />
      <v-btn @click="twitter" color="#1da1f2"
        ><v-icon icon="mdi-twitter" class="mr-0.5"></v-icon> Tweet</v-btn
      >
    </div>
  </div>
</template>

<script setup>
import ExportBtn from '@/components/ExportBtn.vue';
import { useGeneratorControls } from '@/composables/useGeneratorControls';

const {
  store,
  prefixColor,
  suffixColor,
  postfixBgColor,
  fontSize,
  transparentBg,
  transparentBgColor,
  suffixMargin,
  updatePrefix,
  updateSuffix,
  twitter
} = useGeneratorControls({
  suffixMarginScale: 50,
  postfixBgColor: 'transparent',
  suffixColor: '#00AFF0',
  backgroundColor: '#000000',
  initialText: { prefix: 'Only', suffix: 'Fans' },
  resetText: { prefix: 'edit', suffix: 'me' }
});
</script>

<style lang="stylus" scoped>
.pornhub {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box {
  border: 1px solid #333;
  border-radius: 10px;
  padding: 40px;
  margin: 40px 10px;
  max-width: 100%;

  .editarea {
    padding: 20px 30px;
    text-align: center;
    font-size: 60px;
    font-weight: 700;

    .prefix {
      color: #fff;
      padding: 5px 5px;
      font-family: "Inter", sans-serif;
      font-optical-sizing: auto;
      font-weight: 200;
      font-style: normal;
      z-index: 21;
    }

    .postfix {
      color: #000;
      background-color: transparent;
      padding: 5px 10px;
      margin-left: 0rem;
      font-family: "Arizonia", cursive;
      font-weight: 400;
      font-style: normal;
      z-index: 20;
    }
  }
}

.customize {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-bottom: 50px;

  .customize-color > div,
  .customize-misc > div {
    padding: 8px 0;
  }
}

.download-share {
  display: flex;
  justify-content: space-around;
  width: 80%;

  & > div {
    width: 100px;
    height: 40px;
    border-radius: 3px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }

  .download {
    color: black;
    background: #f90;
  }

  .share {
    color: #fff;
    background: #1da1f2;
  }
}
</style>
