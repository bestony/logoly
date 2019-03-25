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
        .prefix
            color #fff
            padding 5px 5px

        .postfix
            color #000
            background-color #f90
            padding 5px 10px
            border-radius 7px
.switch
    display flex
    flex-direction row
    justify-content space-around
    padding 40px 0px 0px 0px
    width 80%

.download
    text-align center
    margin-top 40px


</style>

<template>
    <div class="pornhub">
        <div class="box" v-tooltip="{content:'Edit The Text to Create Your Own Logo', show: true, classes: 'tooltipClasses'}">
            <div class="editarea" id="logo" :style="{'font-size':fontSize + 'px','background-color':transparentBgColor}">
                <span class="prefix"  :style="{'color':prefixColor}"  contenteditable>Edit</span>
                <span class="postfix" :style="{'color':postfixColor, 'background-color':postfixBgColor}" contenteditable>Me</span>
            </div>
        </div>
         <div class="switch" >
                <span id="prefixColor"  v-tooltip="{content:'Switch Color as You Like', show: true, classes: 'tooltipClasses'}">
                  Prefix Text Color : <input type="color" v-model="prefixColor"  />
                </span>
                <span>
                  Suffix Text Color : <input type="color" v-model="postfixColor"  />
                </span>
                <span>
                  Suffix Background Color : <input type="color" v-model="postfixBgColor"  />
                </span>
                <span>
                  Transparent Background: <input type="checkbox"  value="transparentBg" v-model="transparentBg">
                </span>
            </div>
        <div class="switch">
            <span>
                  Font Size: <input type="range" min=30 max=200 v-model="fontSize"  /> {{fontSize}}px
                </span>
        </div>
            
        <div class="download"  v-tooltip="{content:'Export Your Own Logo', show: true, classes: 'tooltipClasses'}">
            <a  class="button" @click="download">Export</a>
        </div>

        <div class="download">
            <a  class="button" style="background-color:#1da1f2;color:#fff;" @click="twitter"><i class="iconfont icon-twitter"></i> Tweet</a>
        </div>
    </div>
</template>

<script>
import domtoimage from 'dom-to-image';
const FileSaver = require('file-saver');


export default {
    name:'pornhub',
    data(){
        return {
            prefixColor: "#ffffff",
            postfixColor: "#000000",
            postfixBgColor: "#ff9900",
            fontSize:"60",
            transparentBg: false
        }
    },
    mounted: function () {
    //   this.$tours['pornhub'].start()
    },
    methods:{
        download(){
            var node = document.getElementById('logo');

            domtoimage.toPng(node)
                .then(function (blob) {
                    FileSaver.saveAs(blob, "logo.png");
                });
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
