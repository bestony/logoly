<style lang="stylus" scoped>
.pornhub
    display flex
    flex-direction  column
    align-items center
.box
    border 2px solid #333
    border-radius 10px
    padding 10px 0px
    margin 40px 0px
    .editarea
        padding 10px
        text-align center
        font-size 60px
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
        <v-tour name="pornhub" :steps="steps"></v-tour>
        <div class="box">
            <div class="editarea" id="logo" :style="{'font-size':fontSize + 'px'}">
                <span class="prefix"  :style="{'color':prefixColor}"  contenteditable>Porn</span>
                <span class="postfix" :style="{'color':postfixColor, 'background-color':postfixBgColor}" contenteditable>Hub</span>
            </div>
        </div>
         <div class="switch">
                <span id="prefixColor">
                  Prefix Text Color : <input type="color" v-model="prefixColor"  />
                </span>
                <span>
                  Postfix Text Color : <input type="color" v-model="postfixColor"  />
                </span>
                <span>
                  Postfix Background Color : <input type="color" v-model="postfixBgColor"  />
                </span>
            </div>
        <div class="switch">
            <span>
                  Font Size: <input type="range" v-model="fontSize"  /> {{fontSize}}px
                </span>
        </div>
            
        <div class="download">
            <a  class="button" @click="download">Download</a>
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
            steps: [
                {
                    target: '#logo',  // We're using document.querySelector() under the hood
                    content: `Edit This Text To Generate Your own Logo`,
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '#prefixColor',
                    content: 'You Can change Color you like'
                },
                {
                    target: '.download',
                    content: 'While you compete your set, Download Your Own Logo.',
                    params: {
                        placement: 'bottom'
                    }
                }
            ]
        }
    },
    mounted: function () {
      this.$tours['pornhub'].start()
    },
    methods:{
        download(){
            var node = document.getElementById('logo');

            domtoimage.toPng(node)
                .then(function (blob) {
                    FileSaver.saveAs(blob, "logo.png");
                });
        }
    }
}
</script>
