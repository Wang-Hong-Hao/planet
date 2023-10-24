<template>
  <home />
</template>

<script lang="ts" setup>
import Home from '@/layout/myHome.vue'
const body = document.body
body.setAttribute('data-theme', 'dark')
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
