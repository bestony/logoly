<template>
  <div id="p0rnhub">
    <h1>P0rnHub Style</h1>
    <v-responsive grid-list-md>
      <v-layout row wrap>
        <v-flex xl9 xs12 class="px-1">
          <v-card dark color="grey" style="height:100%;min-height:300px;">
            <div id="box">
              <template v-if="!reverseHighlight">
                <div
                  id="logo"
                  :style="{ 'font-size': fontSize + 'px',
                        'padding': borderSize + 'px',
                       'background-color': transparentBgColor }"
                >
                  <span class="prefix" @input="updatePrefix" :style="{ color: prefixColor }" contenteditable>{{prefixText}}</span>
                  <span class="postifx" @input="updatePostfix" :style="{ color: postfixColor, 'background-color': postfixBgColor }"  contenteditable>{{postfixText}}</span>
                </div>
              </template>
              <template v-else>
                  <div
                  id="logo"
                  :style="{ 'font-size': fontSize + 'px',
                        'padding': borderSize + 'px',
                       'background-color': transparentBgColor }"
                  >
                  <span class="postifx" @input="updatePrefix"  :style="{ color: postfixColor, 'background-color': postfixBgColor }" contenteditable>{{prefixText}}</span>
                  <span class="prefix" @input="updatePostfix" :style="{ color: prefixColor }" contenteditable>{{postfixText}}</span>
                </div>
              </template>
            </div>
          </v-card>
        </v-flex>
        <v-flex xl3 xs12 class="px-1">
         
          <v-card color="blue-grey darken-2" class="white--text">
            <v-card-title primary-title>
              <div>
                <div class="headline">Logo Settings</div>
              </div>
            </v-card-title>
            <v-card-text>
              <v-input
                prepend-icon="format_color_text"
                type="color"
                dark
              >
                Prefix Text Color: <input type="color" v-model="prefixColor" />
              </v-input>
              <v-input
                prepend-icon="format_color_text"
                type="color"
                dark
              >
                Suffix Text Color: <input type="color" v-model="postfixColor" />
              </v-input>
              <v-input
                prepend-icon="format_color_text"
                type="color"
                dark
              >
                Suffix Background Color: <input type="color" v-model="postfixBgColor" />
              </v-input>
              <v-switch dark v-model="transparentBg" :label="`Transparent background`"></v-switch>
              <v-switch dark v-model="reverseHighlight" :label="`Reverse Highlight`"></v-switch>
              <v-slider
                v-model="fontSize"
                max="150"
                min="40"
                label="Font Size"
                dark
                prepend-icon="font_download"
              ></v-slider>
              <v-slider
                v-model="borderSize"
                max="200"
                min="20"
                label="Border Size"
                dark
                prepend-icon="check_box_outline_blank"
              ></v-slider>
              
   
            </v-card-text>
            
          </v-card>
           <v-btn style="min-height:20px" block color="success" v-on:click="$emit('download-image')">
            <v-icon>send</v-icon>Download
          </v-btn>
          <v-btn block color="info" v-on:click="$emit('share-twitter')">
            <v-icon>fab fa-twitter</v-icon>Share on Twitter
          </v-btn>
        </v-flex>
      </v-layout>
    </v-responsive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fontSize: 40,
      transparentBg: false,
      prefixText: this.$store.state.prefixText,
      postfixText: this.$store.state.postfixText,
      prefixColor: '#ffffff',
      postfixColor: '#000000',
      postfixBgColor: '#ff9900',
      reverseHighlight: false,
      borderSize: 20,
    }
  },
  methods: {
    updatePrefix(e) {
      this.$store.commit('updatePrefix', e.target.childNodes[0].nodeValue)
    },
    updatePostfix(e) {
      this.$store.commit('updatePostfix', e.target.childNodes[0].nodeValue)
    },
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
}
</script>
<style lang="stylus" scoped>
#box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px;

  #logo {
    display: flex;
    max-width: 100%;

    .prefix {
      color: #fff;
      padding: 5px 5px;
      min-width: 50px;
    }

    .postifx {
      color: #000;
      background-color: #f90;
      padding: 5px 10px;
      border-radius: 7px;
      min-width: 50px;
    }
  }
}
</style>
