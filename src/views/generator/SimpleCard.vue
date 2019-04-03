<template>
    <div class="pornhub">
        <h1>Simple Card generator</h1>
        <Row>
            <Col :xs="24" :sm="24" :md="24" :lg="24">
                <Card class="text-box" :style="{ 'font-size': logoFontSize + 'px'}">
                        <div id="logo-area" 
                            class="logo-area" 
                            
                            :style="{'background-color':CardBackground,fontFamily:usingFont, 'width':cardWidth + 'px','height':cardHeight+'px'}">
                            <P 
                                contenteditable 
                                class="card_text" 
                                spellcheck="false" 
                                :style="{'color':textColor + ' !important',lineHeight:lineHeight+'px'}" 
                                >{{text_line_one}}</P>
                            <P contenteditable class="card_text" spellcheck="false" :style="{'color':textColor + ' !important',lineHeight:lineHeight+'px'}" >{{text_line_two}}</P>
                        </div>
                   
                </Card>
            </Col>
            <Col :xs="24" :sm="24" :md="24" :lg="24" class="option-panel">
                <Row  :gutter="16">
                    <Col :xs="24" :sm="24" :md="12" :lg="12">
                    
                        <Row>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <h1>Card Settings</h1>
                                
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <h2>Card Size</h2>
                                <Input v-model="cardWidth" placeholder="700px" clearable >
                                        <span slot="prepend">Width</span>
                                </Input>
                                <br/>
                                <Input v-model="cardHeight" placeholder="500px" clearable >
                                        <span slot="prepend">Height</span>
                                </Input>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <h2>Font Size</h2>
                                <Slider v-model="logoFontSize" :min="30" :max="500" show-input></Slider>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <h2>Line Height</h2>
                                <Slider v-model="lineHeight" :min="30" :max="500" show-input></Slider>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <h2>Card Background Color</h2>
                                 <ColorPicker v-model="CardBackground" :colors="recommendColors" />
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <h2>Text Color</h2>
                                 <ColorPicker v-model="textColor" :colors="recommendColors" />
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
        max-width 100%;
        max-height 100%
        font-family Arial,Helvetica,sans-serif
        display flex
        flex-direction column
        justify-content center
        align-items center
    .card_text
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
            logoFontSize: 50,
            cardWidth: 900,
            cardHeight: 383,
            recommendColors: ["#444444","#aceacf","#302387"],
            CardBackground: "#000",
            textColor:"#fff",
            fileType: 'png',
            lineHeight: 50,
            prefixText: this.$store.state.prefixText,
            suffixText: this.$store.state.suffixText,
            fontFamily: this.$store.state.fontFamily,
            usingFont: "Arial,Helvetica,sans-serif",
            text_line_one: 'Line One',
            text_line_two: 'Line Two'
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
        updatePrefix(e){
            this.$store.commit('updatePrefix',e.target.childNodes[0].nodeValue)
        },
        updateSuffix(e){
            this.$store.commit('updateSuffix',e.target.childNodes[0].nodeValue)
        },

        download(){
            var node = document.getElementById('logo-area')
            switch (this.fileType) {
                case 'png':
                    domtoimage.toPng(node).then(blob => {
                        FileSaver.saveAs(blob, `${this.text_line_one}.png`)
                    })
                    break;
                case 'jpg':
                    domtoimage.toJpeg(node).then(blob =>{
                         FileSaver.saveAs(blob, `${this.text_line_one}.jpg`)
                    })
                    break;
                case 'svg':
                    domtoimage.toSvg(node).then(blob =>{
                         FileSaver.saveAs(blob, `${this.text_line_one}.svg`)
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
