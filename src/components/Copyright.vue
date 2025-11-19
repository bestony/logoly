<template>
  <p class="text-center text-[#666]">
    © Bestony {{ currentYear }}
    <a href="https://www.ixiqin.com" target="_blank" rel="noopener noreferrer">website</a>
  </p>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>
