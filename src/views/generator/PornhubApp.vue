<template>
    <div class="pornhub">
        <h1>Pornhub App Flavour Logo generator</h1>
        <Row>
            <Col :xs="24" :sm="24" :md="24" :lg="24">
                <Card class="text-box" :style="{ 'font-size': logoFontSize + 'px','background-color':'#333'}">
                    <template v-if="!isReverse">
                        <div id="logo-area" class="logo-area" :style="{'background-color':transparentBgColor,fontFamily:usingFont}">
                            <p 
                                class="prefix" 
                                :style="{'color':prefixFontColor + ' !important'}" 
                                contenteditable 
                                spellcheck="false">{{prefixText}}</p>
                            <p 
                                class="suffix" 
                                :style="{'color':suffixFontColor + ' !important','background-color': suffixBackgroundColor+ ' !important'}" 
                                contenteditable 
                                spellcheck="false">{{suffixText}}</p>
                        </div>
                    </template>
                    <template v-else>
                        <div id="logo-area" class="logo-area" :style="{'background-color':transparentBgColor,fontFamily:usingFont}">
                            <p 
                                class="suffix" 
                                :style="{'color':suffixFontColor + ' !important','background-color': suffixBackgroundColor+ ' !important'}" 
                                contenteditable spellcheck="false">{{prefixText}}</p>
                            <p 
                                class="prefix" 
                                :style="{'color':prefixFontColor + ' !important'}" 
                                contenteditable spellcheck="false">{{suffixText}}</p>
                        </div>
                    </template>
                </Card>
            </Col>
            <Col :xs="24" :sm="24" :md="24" :lg="24" class="option-panel">
                <Row  :gutter="16">
                    <Col :xs="24" :sm="24" :md="12" :lg="12">
                    
                        <Row>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <h1>Logo Settings</h1>
                                
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <h2>Font Size</h2>
                                <Slider v-model="logoFontSize" :min="30" :max="500" show-input></Slider>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <h2>Prefix Text Color</h2>
                                 <ColorPicker v-model="prefixFontColor" alpha :colors="recommendColors" />
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <h2>Suffix Text Color</h2>
                                 <ColorPicker v-model="suffixFontColor" alpha :colors="recommendColors" />
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <h2>Suffix Background Color</h2>
                                 <ColorPicker v-model="suffixBackgroundColor" alpha :colors="recommendColors" />
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <h2>Reverse Highlight</h2>
                                 <i-switch v-model="isReverse" @on-change="reverseHighlight" />
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <h2>Transparent Background</h2>
                                 <i-switch v-model="isTransparent" @on-change="reverseTransparent" />
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <h2>Font Family</h2>
                                <Select v-model="usingFont">
                                    <Option value="Arial,Helvetica,sans-serif" >Arial,Helvetica,sans-serif</Option>
                                    <Option v-for="item in fontFamily" :value="item" :key="item">{{ item }}</Option>
                                </Select>
                            </Col>
                        </Row>
                        
                    </Col>
                    <Col :xs="24" :sm="24" :md="12" :lg="12">
                        <Row>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <h1>Export Settings</h1>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <h2>File Type</h2>
                                <RadioGroup v-model="fileType"  type="button"   size="large">
                                    <Radio label="png"></Radio>
                                    <Radio label="jpg"></Radio>
                                    <Radio label="svg"></Radio>
                                </RadioGroup>
                            </Col>
                             <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <h2>Export && Share</h2>
                                <Button type="primary" icon="md-cloud-download" size="large" long @click="download">Export</Button>
                                <br />
                                <br />
                                <Button type="success" icon="logo-twitter" size="large" long @click="twitter">Tweet</Button>
                            </Col>
                           
                        </Row>
                        
                    </Col>
                </Row>
            </Col>
        </Row>

    </div>
</template>
<style lang="stylus" scoped>
h1
    margin 0px 0px 20px 0px

.text-box
    min-height 300px
    display flex
    justify-content center
    align-items center
    .logo-area
        padding 10px
    .prefix
        color #fff
        padding 5px 5px
        text-align center
    .suffix
        color #000
        background-color #f90
        padding 5px 10px
        border-radius 7px
        text-align center
.option-panel
    margin 20px 0px
    h2
        margin 10px 0px 5px 0px
</style>
<script>
import domtoimage from 'dom-to-image'
const FileSaver = require('file-saver')
let WebFont = require('webfontloader')
export default {
    data(){
        return {
            logoFontSize: 60,
            prefixFontColor: "rgba(255,255,255,1)",
            suffixFontColor:  "rgba(255,255,255,1)",
            suffixBackgroundColor:  "rgba(255,153,0,1)",
            recommendColors: ["rgba(255,153,0,1)","rgba(255,255,255,1)"],
            isReverse:false,
            isTransparent: false,
            transparentBgColor: '#333',
            fileType: 'png',
            prefixText: 'Edit',
            suffixText: 'Me',
            fontFamily: this.$store.state.fontFamily,
            usingFont: "Arial,Helvetica,sans-serif"
        }
    },
     created(){
        WebFont.load({
            google: {
                families: this.$store.state.fontFamily
            }
        });
    },
     methods: {
        reverseHighlight (status) {
            this.isReverse = status
        },
        reverseTransparent (status) {
            if(status){
                this.transparentBgColor = "transparent"
            }else{
                this.transparentBgColor = "#333"
            }
        },
        download(){
            var node = document.getElementById('logo-area')
            switch (this.fileType) {
                case 'png':
                    domtoimage.toPng(node).then(blob => {
                        FileSaver.saveAs(blob, `${this.prefixText}${this.suffixText}.png`)
                    })
                    break;
                case 'jpg':
                    domtoimage.toJpeg(node).then(blob =>{
                         FileSaver.saveAs(blob, `${this.prefixText}${this.suffixText}.jpg`)
                    })
                    break;
                case 'svg':
                    domtoimage.toSvg(node).then(blob =>{
                         FileSaver.saveAs(blob, `${this.prefixText}${this.suffixText}.svg`)
                    })
                    break;
                default:
                    break;
            }
            
        },
        twitter() {
            this.$ga.event('social', 'action', 'twitter', 1)
            let url = 'https://logoly.pro'
            let text = encodeURIComponent(`Built with #LogolyPro, by @xiqingongzi ${url}`)
            window.open(`https://twitter.com/intent/tweet?text=${text}`)
        },
    }
}
</script>
