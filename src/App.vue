<template>
  <v-app>
    <v-toolbar app fixed dark>
      <v-toolbar-title>Logoly</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Github</v-btn>
        <v-btn flat>How To</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>  
  </v-app>
</template>

<script>
export default {
  components: {},
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>
