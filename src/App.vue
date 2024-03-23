<template>
  <div id="app">
    <Ribbon></Ribbon>
    <div class="logo">
      <logo></logo>
    </div>
    <div class="description">
      <Description></Description>
    </div>
    <div id="nav">
      <div class="menu">
        <router-link to="/about">About</router-link>
        <router-link to="/" class="pb">
          <span class="prefix">Porn</span>
          <span class="postfix">hub</span>
        </router-link>
        <router-link to="/vertical-ph" class="vph">
          <p class="prefix">Porn</p>
          <p class="postfix">hub</p>
        </router-link>
        <router-link to="/onlyfans" class="of">
          <span class="prefix">Only</span>
          <span class="postfix">Fans</span>
        </router-link>
        <span class="disable">More coming soon...</span>
      </div>
    </div>
    <router-view class="container"/>
    <Slogan class="container"></Slogan>
    <Faq class="container"></Faq>
    <Author class="container"></Author>
    <Copyright  class="container"></Copyright>
  </div>
</template>

<script setup>
import Logo from "@/components/Logo.vue";
import Description from "@/components/Description.vue";
import Slogan from "@/components/Slogan.vue";
import Faq from "@/components/Faq.vue";
import Author from "@/components/Author.vue";
import Ribbon from "@/components/Ribbon.vue";
import Copyright from "@/components/Copyright.vue";
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  background-color: #000;
  color: #f90;
  font-family: Arial,Helvetica,sans-serif;
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
  padding: 20px 0px;
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
.of .prefix {
  color: #fff;
  padding: 2px;
}
.of .postfix {
  color: #00AFF0;
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
.vph{
  text-align: center;
}
.vph .prefix{
  margin: 0px;
  color:#fff;
}
.vph .postfix{
  margin: 0px;
  color: #000;
  background-color: #f90;
  padding: 2px;
  border-radius: 3px;
}
span.disable{
  color:#777 !important;
  font-weight: 500;
}
.container{
  width: 60%;
  padding: 20px 20%;
}
.button{
     display: inline-block;
    zoom: 1;
    line-height: normal;
    white-space: nowrap;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    -webkit-user-drag: none;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    box-sizing: border-box;
    font-family: inherit;
    font-size: 100%;
    padding: 0.5em 1em;
    color: #000;
    border: 1px solid #999;  /*IE 6/7/8*/
    border: none rgba(0, 0, 0, 0);  /*IE9 + everything else*/
    background-color: #f90;
    text-decoration: none;
    border-radius: 2px;
}
.v-popper--theme-ownTooltip .v-popper__inner {
    background: #666;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
}

.v-popper--theme-tooltip .v-popper__arrow-outer {
  border-color: #666
}
</style>
