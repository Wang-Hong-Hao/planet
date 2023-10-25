<template>
  <my-home>
    <router-view />
  </my-home>
</template>

<script lang="ts">
import myHome from '@/layout/myHome.vue'
export default {
  components: {
    myHome
  },
  setup() {
    const body = document.body
    body.setAttribute('data-theme', 'dark')
    return {}
  }
}

</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
