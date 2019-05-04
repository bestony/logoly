<template>
  <div class="home-carousel">
    <v-carousel hide-controls height="400">
      <v-carousel-item class="light-blue">
        <v-container fill-height>
          <v-layout align-center>
            <v-flex>
              <h3 class="display-3 white--text">Welcome to Logoly</h3>

              <span
                class="title white--text"
              >Logoly is a minimal logo generator for developers, designers, and makers.</span>

              <v-divider class="my-3"></v-divider>

              <div class="title mb-3 white--text">Check out our newest generator!</div>

              <v-btn class="mx-0" color="red darken-4" large>Youtube</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-carousel-item>
      <v-carousel-item  class="cyan">
          <v-container fill-height>
          <v-layout align-center>
            <v-flex>
              <h3 class="display-3 white--text">Logoly is easy to use</h3>

              <span
                class="title white--text"
              >Just click, edit, and download</span>

              <v-divider class="my-3"></v-divider>

              <div class="title mb-3 white--text">Learn how to use logoly save your time</div>


              <v-btn class="mx-0" color="primary" large>See tutorials</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
    }
  },
}
</script>
