<style lang="stylus" scoped>
.pornhub
    display flex
    flex-direction  column
    align-items center
.box
    border 2px solid #333
    border-radius 10px
    padding 40px
    margin 40px 0px
    max-width 100%
    .editarea
        padding 20px
        text-align center
        font-size 60px
        font-weight 700
        border-radius 10px

        .prefix
            color #fff
            padding 5px 5px
            margin 0

        .postfix
            color #000
            background-color #f90
            padding 5px 10px
            border-radius 7px
            margin 0
.switch
    display flex
    flex-direction row
    justify-content space-around
    padding 40px 0px 0px 0px
    width 80%

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

<template>
    <div class="pornhub">
        <div class="box" v-tooltip="{content:'Edit the text to create your own logo', show: true, classes: 'tooltipClasses'}">
            <div class="editarea" id="logo" :style="{'font-size':fontSize + 'px','background-color':transparentBgColor}">
                <template v-if="!reverseHighlight">
                <p class="prefix"  @input="updatePrefix" :style="{'color':prefixColor}"  contenteditable>{{prefixText}}</p>
                <p class="postfix" @input="updateSuffix" :style="{'color':suffixColor, 'background-color':postfixBgColor}" contenteditable>{{suffixText}}</p>
                </template>
                <template v-else>
                <p class="postfix" @input="updatePrefix" :style="{'color':suffixColor, 'background-color':postfixBgColor}" contenteditable>{{prefixText}}</p>
                <p class="prefix"  @input="updateSuffix" :style="{'color':prefixColor}"  contenteditable>{{suffixText}}</p>
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
            <div>Suffix Text Color: &nbsp; <input type="color" v-model="suffixColor" /></div>
            <div>Suffix Background Color: &nbsp; <input type="color" v-model="postfixBgColor" /></div>
            <div>
              Transparent Background: &nbsp;
              <input type="checkbox" value="transparentBg" v-model="transparentBg" />
            </div>
          </div>

          <div class="customize-misc">
            <div>
              Font Size: <input type="range" min="30" max="200" v-model="fontSize" /> {{ fontSize }}px
            </div>
            <div>Reverse Highlight: <input type="checkbox" v-model="reverseHighlight" /></div>
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
    </div>
</template>

<script>
import domtoimage from 'dom-to-image';

export default {
    name:'pornhub',
    data(){
        return {
            prefixColor: "#ffffff",
            suffixColor: "#000000",
            postfixBgColor: "#ff9900",
            fontSize:"60",
            transparentBg: false,
            reverseHighlight: false,
            prefixText: this.$store.state.prefix,
            suffixText: this.$store.state.suffix
        }
    },
    mounted: function () {
    //   this.$tours['pornhub'].start()
    },
    methods:{
        updatePrefix(e){
            this.$store.commit('updatePrefix',e.target.childNodes[0].nodeValue)
        },
        updateSuffix(e){
            this.$store.commit('updateSuffix',e.target.childNodes[0].nodeValue)
        },
        downloadIamge(imgsrc, name) {//下载图片地址和图片名
            let image = new Image();
            // 解决跨域 Canvas 污染问题
            image.setAttribute("crossOrigin", "anonymous");
            image.onload = function() {
                let canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                let context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, image.width, image.height);
                let url = canvas.toDataURL("image/png");
                let a = document.createElement("a");
                let event = new MouseEvent("click");
                a.download = name || "photo";
                a.href = url;
                a.dispatchEvent(event);
            };
            image.src = imgsrc;
        },
        download() {
            var that=this
            var node = document.getElementById('logo')
            domtoimage.toPng(node).then(function(res) {
                console.log(res)
                that.downloadIamge(res,"logo.png")

            })
        },
        twitter(){
            this.$ga.event('social', 'action', 'twitter', 1)
            let url = "https://logoly.pro"
            let text = encodeURIComponent(`Built with #LogolyPro, by @xiqingongzi ${url}`)
            window.open(`https://twitter.com/intent/tweet?text=${text}`)
        }
    },
    computed:{
        transparentBgColor(){
            if(this.transparentBg){
                return 'transparent'
            }else{
                return '#000000'
            }
        }
    }
}
</script>
