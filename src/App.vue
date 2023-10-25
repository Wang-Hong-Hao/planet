<template>
  <my-home>
    <router-view />
  </my-home>
</template>

<script lang="ts">
import myHome from '@/layout/myHome.vue'
import { onMounted } from 'vue';
import { useAppStore } from '@/store/app'
export default {
  components: {
    myHome
  },
  setup() {
    const appStore = useAppStore()
    onMounted(() => {
      // 检查当前时间
      const currentTime: number = new Date().getHours();
      if (currentTime >= 18 || currentTime < 6) {
        // 如果当前时间是晚上，应用夜晚主题
        appStore.toggleTheme('dark')
      } else {
        // 如果当前时间是白天，应用白天主题
        appStore.toggleTheme('light')
      }
    })
    return {}
  }
}

</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
