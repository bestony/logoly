<template>
  <div id="p0rnhub">
    <h1>P0rnHub Style</h1>
    <v-responsive grid-list-md>
      <v-layout row wrap>
        <v-flex xl8 xs12 class="px-1">
          <v-card dark color="grey" style="height:100%;min-height:300px;">
            <div id="box">
                <div id="logo">
                    <span class="prefix" @input="updatePrefix" contenteditable>
                        {{prefixText}}
                    </span>
                    <span class="postifx" @input="updateSuffix" contenteditable>
                        {{suffixText}}
                    </span>
                </div>
            </div>
          </v-card>
        </v-flex>
        <v-flex xl4 xs12 class="px-1">
          <v-btn style="min-height:20px" block color="success" v-on:click="$emit('download-image')">
            <v-icon>send</v-icon>Download
          </v-btn>        
          <v-btn block color="info" v-on:click="$emit('share-twitter')">
            <v-icon>fab fa-twitter</v-icon>Share on Twitter
          </v-btn>
           <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div>
                  <div class="headline">Logo Settingss</div>
                </div>
              </v-card-title>
              <v-card-text>
                  <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span>
              </v-card-text>
            
            </v-card>
        </v-flex>
        
      </v-layout>
    </v-responsive>
  </div>
</template>

<script>
export default {
    data(){
        return {
            prefixText: this.$store.state.prefixText,
            suffixText: this.$store.state.suffixText
        }
    },
    methods:{
        updatePrefix(e){
            this.$store.commit('updatePrefix',e.target.childNodes[0].nodeValue)
        },
        updateSuffix(e){
            this.$store.commit('updateSuffix',e.target.childNodes[0].nodeValue)
        },
    }
}
</script>
<style lang="stylus" scoped>
#box
  display flex
  align-items center
  justify-content center
  height 100%
  #logo
    display flex
    background-color #000
    padding 20px
    .prefix
        color #fff
        padding 5px 5px
    .postifx
        color #000
        background-color #f90
        padding 5px 10px
        border-radius 7px

</style>
