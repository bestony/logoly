<template>
  <div class="t66y">
    <div
      class="box"
      v-tooltip="{
        content: 'Edit the text to create your own logo',
        show: true,
        classes: 'tooltipClasses',
      }"
    >
      <div
        class="editarea"
        id="logo"
        :style="{ 'font-size': fontSize + 'px'}"
      >
        <template v-if="transparentBg">
          <span class="prefix t66y-font" :style="{ color: prefixColor, borderRadius: borderRadius + 'px' }" contenteditable spellcheck="false" @blur="loadFont">{{prefixText}}</span>
        </template>
        <template v-else>
          <span class="prefix t66y-font" :style="{ color: prefixColor, 'background-color': postfixBgColor, borderRadius: borderRadius + 'px' }" contenteditable spellcheck="false" @blur="loadFont">{{prefixText}}</span>
        </template>
      </div>
    </div>
    <div class="customize">
      <div
        class="customize-color"
        id="prefixColor"
        v-tooltip="{ content: 'Pick a color you like', show: true, classes: 'tooltipClasses' }"
      >
        <div>Prefix Text Color: &nbsp; <input type="color" v-model="prefixColor" /></div>
        <div>Prefix Background Color: &nbsp; <input type="color" v-model="postfixBgColor" /></div>
        <div>
          Transparent Background: &nbsp;
          <input type="checkbox" value="transparentBg" v-model="transparentBg" />
        </div>
      </div>

      <div class="customize-misc">
        <div>
          Font Size: <input type="range" min="30" max="200" v-model="fontSize" /> {{ fontSize }}px
        </div>
        <div>
          Border Radius: <input type="range" min="0" max="100" v-model="borderRadius" /> {{ borderRadius }}px
        </div>
      </div>
    </div>

    <div class="download-share">
      <div
        class="download"
        v-tooltip="{ content: 'Export your own logo', show: true, classes: 'tooltipClasses' }"
        @click="download"
      >
        Export
      </div>

      <div class="share" @click="twitter"><i class="iconfont icon-twitter"></i> Tweet</div>
    </div>
    <div class="mask" v-if="isMask">
      生成中……
    </div>
  </div>
</template>

<script>
  import domtoimage from 'dom-to-image'
  const FileSaver = require('file-saver')
  export default {
    name: 'T66y',
    components: {
    },
    data() {
      return {
        prefixColor: '#ffffff',
        suffixColor: '#000000',
        postfixBgColor: '#000',
        fontSize: '60',
        borderRadius: 0,
        transparentBg: false,
        prefixText: 'Edit',
        isMask: false
      }
    },
    methods: {
      init () {
        this.loadFont()
      },
      download() {
        var node = document.getElementById('logo')

        domtoimage.toPng(node).then(function(blob) {
          FileSaver.saveAs(blob, 'logo.png')
        })
      },
      twitter() {
        this.$ga.event('social', 'action', 'twitter', 1)
        let url = 'https://logoly.pro'
        let text = encodeURIComponent(`Built with #LogolyPro, by @xiqingongzi ${url}`)
        window.open(`https://twitter.com/intent/tweet?text=${text}`)
      },

      loadFont () {
        // eslint-disable-next-line
        $youziku.submit('t66y');

      }
    },
    computed: {
      transparentBgColor() {
        if (this.transparentBg) {
          return 'transparent'
        } else {
          return '#000000'
        }
      },
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped lang="stylus">
.t66y
  display flex
  flex-direction  column
  align-items center
.mask
  display flex
  top 0
  left 0
  width 100%
  height 100vh
  background-color rgba(0, 0, 0, .7)
  justify-content center
  align-items center
  color #fff
  font-size 40px
  position fixed
  z-index 9999
.box
  border 1px solid #333
  border-radius 10px
  padding 40px
  margin 40px 10px
  max-width 100%
  .editarea
    /*padding 20px*/
    text-align center
    font-size 60px
    font-weight normal
    background-color transparent
    .prefix
      color #fff
      padding 5px 10px
      display inline-block
      background-color transparent

// customize things
.customize
  display flex
  justify-content space-around
  width 100%
  margin-bottom 50px
  .customize-color > div,
  .customize-misc > div
    padding 8px 0

// download and share buttons
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
  .download
    color black
    background #f90
  .share
    color #fff
    background #1da1f2

</style>
