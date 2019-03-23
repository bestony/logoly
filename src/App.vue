<template>
  <div id="app">
    <div class="logo">
      <logo></logo>
    </div>
    <div class="descriptio">
      <Description></Description>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Logo from './components/Logo';
import Description from './components/Description'
export default {
  components:{
    logo:Logo,
    Description
  }
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  background-color: #000;
  color:#f90;
}
a{
  color:#f90;
}
.logo,.description {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
