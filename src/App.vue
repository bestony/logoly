<template>
  <div id="app" class="container mx-auto py-12 px-6 max-w-[893px]">
    <Ribbon class="z-50"></Ribbon>
    <div class="text-4xl font-black p-5 my-6 text-center">
      <logo></logo>
    </div>
    <div class="text-2xl mb-6 text-center font-extrabold">
      <Description></Description>
    </div>
    <div id="nav">
      <div
        class="flex flex-col md:flex-row gap-2 md:gap-16 text-xl font-semibold items-center mb-12 justify-center"
      >
        <router-link to="/about">About</router-link>
        <router-link to="/" class="pb">
          <span class="prefix">Porn</span>
          <span class="postfix">hub</span>
        </router-link>
        <router-link to="/vertical-ph" class="vph">
          <p class="prefix">Porn</p>
          <p class="postfix">hub</p>
        </router-link>
        <router-link to="/onlyfans">
          <span class="text-white">Only</span>
          <span class="text-[#00AFF0]">Fans</span>
        </router-link>
        <span class="text-[#777] font-light">More coming soon...</span>
      </div>
    </div>
    <router-view />
    <Slogan />
    <Faq />
    <Author />
    <Copyright class="pb-4" />
  </div>
</template>

<script setup>
import Logo from '@/components/Logo.vue';
import Description from '@/components/Description.vue';
import Slogan from '@/components/Slogan.vue';
import Faq from '@/components/Faq.vue';
import Author from '@/components/Author.vue';
import Ribbon from '@/components/Ribbon.vue';
import Copyright from '@/components/Copyright.vue';
</script>
