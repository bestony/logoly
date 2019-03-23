<template>
  <div id="app">
    <div class="logo">
      <logo></logo>
    </div>
    <div class="descriptio">
      <Description></Description>
    </div>
    <div id="nav">
      <div class="menu">
        <router-link to="/about">About</router-link>
        <router-link to="/" class="pb">
          <span class="prefix">Porn</span>
          <span class="postfix">Hub</span>
        </router-link>
        <span class="disable">
          <span class="prefix">You</span>  
          <span class="postfix">tube</span>
        </span>
        <span class="disable">More in Progress...</span>
      </div>
    </div>
    <router-view class="router-view"/>
  
  </div>
</template>

<script>
import Logo from "./components/Logo";
import Description from "./components/Description";
export default {
  components: {
    logo: Logo,
    Description
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  background-color: #000;
  color: #f90;
}
a {
  color: #f90;
  text-decoration: none;
}
.logo,
.description {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#nav {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 20px;
}
.menu {
  width: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-weight: 700;
}
.pb .prefix {
  color: #fff;
  padding: 2px;
}
.pb .postfix {
  color: #000;
  background-color: #f90;
  padding: 2px;
  border-radius: 3px;
}
.yb .prefix{
  color: #fff;
  padding: 2px;
}
.yb .postfix{
  color: #fff;
  background-color: #ff0000;
  padding: 2px;
  border-radius: 3px;
  letter-spacing: -1px;
}
span.disable{
  color:#777 !important;
  font-weight: 500;
}
.router-view{
  width: 60%;
  padding: 20px 20%;
}
</style>
