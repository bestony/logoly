<template>
  <div class="pornhub">
    <div
      class="box"
      v-tooltip="{
        content: 'Edit the text to create your own logo',
        shown: true,
        popperClass: 'tooltipClasses',
        theme: 'ownTooltip'
      }"
    >
      <div
        class="editarea"
        id="logo"
        :style="{
          'font-size': fontSize + 'px',
          'background-color': transparentBgColor,
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
            :style="{ color: suffixColor, 'background-color': postfixBgColor, 'margin-left': suffixMargin }"
            :contenteditable="store.editable"
            @input="updateSuffix"
            spellcheck="false"
            >{{ store.suffix }}</span
          >
      </div>
    </div>

    <div class="customize">
      <div>
          Font Size:
          <input type="range" min="30" max="200" v-model="fontSize" />
          {{ fontSize }}px
        </div>
        <div>
          Transparent Background: &nbsp;
          <input type="checkbox" value="transparentBg" v-model="transparentBg" />
        </div>
    </div>

    <div class="download-share">
      <ExportBtn />
      <div class="share" @click="twitter"><i class="iconfont icon-twitter"></i> Tweet</div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useStore } from '@/stores/store'
import ExportBtn from '@/components/ExportBtn.vue'

const prefixColor = ref('#ffffff')
const suffixColor = ref('#00AFF0')
const postfixBgColor = ref('transparent')
const fontSize = ref(60)
const transparentBg = ref(false)
const suffixMargin = computed(() => {
  return '-' + fontSize.value / 35 + 'rem'
})

const store = useStore()

const updatePrefix = (e) => {
  store.updatePrefix(e.target.childNodes[0].nodeValue)
}

const updateSuffix = (e) => {
  store.updateSuffix(e.target.childNodes[0].nodeValue)
}

const twitter = () => {
  let url = 'https://logoly.pro'
  let text = encodeURIComponent(`Built with #LogolyPro, by @xiqingongzi ${url}`)
  window.open(`https://twitter.com/intent/tweet?text=${text}`)
}

const transparentBgColor = computed(() => {
  if (transparentBg.value) {
    return 'transparent'
  } else {
    return '#000000'
  }
})

onMounted(() => {
  store.updatePrefix('Only')
  store.updateSuffix('Fans')
})

onBeforeUnmount(() => {
  store.updatePrefix('edit')
  store.updateSuffix('me')
})
</script>

<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css2?family=Arizonia&family=Inter:wght@100&display=swap')

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

/* We need that Shizzle for dom-to-image otherwise the exported Img will have wrong fonts */
/* vietnamese */
@font-face {
  font-family: 'Arizonia';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/arizonia/v21/neIIzCemt4A5qa7mv5WOFqwYUp31kXI.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Arizonia';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/arizonia/v21/neIIzCemt4A5qa7mv5WPFqwYUp31kXI.woff2) format('woff2');
  unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Arizonia';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/arizonia/v21/neIIzCemt4A5qa7mv5WBFqwYUp31.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeAZJhiJ-Ek-_EeAmM.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeAZthiJ-Ek-_EeAmM.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeAZNhiJ-Ek-_EeAmM.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeAZxhiJ-Ek-_EeAmM.woff2) format('woff2');
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeAZBhiJ-Ek-_EeAmM.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeAZFhiJ-Ek-_EeAmM.woff2) format('woff2');
  unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeAZ9hiJ-Ek-_EeA.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
</style>
