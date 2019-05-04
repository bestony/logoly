<template>
  <v-app>
    <v-toolbar app fixed dark>
      <v-toolbar-title>Logoly</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>How To</v-btn>
        <v-btn flat icon to="/github">
          <v-icon>fab fa-github</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>
      <v-footer class="pa-3 black">
        <v-spacer></v-spacer>
        <div class="white--text">&copy; {{ new Date().getFullYear() }} Bestony</div>
      </v-footer>
  </v-app>
</template>

<script>
export default {
  components: {},
  
}
</script>

<style>
</style>
