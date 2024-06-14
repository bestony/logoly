<template>
  <div class="pornhub">
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
          </div>
        </div>
      </template>
    </v-tooltip>

    <div class="customize mt-3">
      <v-tooltip text="Pick a color you like" location="top" model-value>
        <template v-slot:activator="{ props }">
          <div v-bind="props" class="customize-color" id="prefixColor">
            <div>
              Prefix Text Color:
              <v-menu :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                  <button
                    v-bind="props"
                    class="w-12 h-6 rounded ml-1 border-2 border-solid border-white"
                    :style="{ 'background-color': prefixColor }"
                  ></button>
                </template>
                <v-color-picker mode="hex" hide-inputs v-model="prefixColor"></v-color-picker>
              </v-menu>
            </div>
            <div>
              Suffix Text Color:
              <v-menu :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                  <button
                    v-bind="props"
                    class="w-12 h-6 rounded ml-1 border-2 border-solid border-white"
                    :style="{ 'background-color': suffixColor }"
                  ></button>
                </template>
                <v-color-picker mode="hex" hide-inputs v-model="suffixColor"></v-color-picker>
              </v-menu>
            </div>
            <div>
              Suffix Background Color:
              <v-menu :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                  <button
                    v-bind="props"
                    class="w-12 h-6 rounded ml-1 border-2 border-solid border-white"
                    :style="{ 'background-color': postfixBgColor }"
                  ></button>
                </template>
                <v-color-picker mode="hex" hide-inputs v-model="postfixBgColor"></v-color-picker>
              </v-menu>
            </div>
            <div class="flex items-center">
              Transparent Background: <v-checkbox-btn v-model="transparentBg"></v-checkbox-btn>
            </div>
          </div>
        </template>
      </v-tooltip>

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
              v-model="fontSize"
            ></v-slider>
          </div>
        </div>
        <FontSelector />
        <div class="flex items-center">
          Reverse Highlight: <v-checkbox-btn v-model="reverseHighlight"></v-checkbox-btn>
        </div>
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
import FontSelector from '@/components/FontSelector.vue';
import { computed, ref } from 'vue';
import { useStore } from '@/stores/store';
import ExportBtn from '@/components/ExportBtn.vue';

const prefixColor = ref('#ffffff');
const suffixColor = ref('#000000');
const postfixBgColor = ref('#ff9900');
const fontSize = ref(60);
const transparentBg = ref(false);
const reverseHighlight = ref(false);

const store = useStore();

const updatePrefix = (e) => {
  if (!navigator.userAgent.toLowerCase().includes('firefox')) {
    store.updatePrefix(e.target.childNodes[0].nodeValue);
  }
};

const updateSuffix = (e) => {
  if (!navigator.userAgent.toLowerCase().includes('firefox')) {
    store.updateSuffix(e.target.childNodes[0].nodeValue);
  }
};

const twitter = () => {
  let url = 'https://logoly.pro';
  let text = encodeURIComponent(`Built with #LogolyPro, by @xiqingongzi ${url}`);
  window.open(`https://twitter.com/intent/tweet?text=${text}`);
};

const transparentBgColor = computed(() => {
  if (transparentBg.value) {
    return 'transparent';
  } else {
    return '#000000';
  }
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
    padding: 20px;
    text-align: center;
    font-size: 60px;
    font-weight: 700;

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
  }
}

.customize {
  display: flex;
  justify-content: space-around;
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
