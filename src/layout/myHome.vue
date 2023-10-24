<template>
  <div class="home">
    <header>
      <myMenu />
    </header>
    <div class="container">
      <Transition>
        <router-view>
          <keep-alive />
        </router-view>
      </Transition>
    </div>
    <footer />
  </div>
</template>
<script setup lang="ts">
import myMenu from './myMenu.vue'
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;

  header {
    height: 80px;
  }

  .container {
    flex: 1;
  }

  footer {
    height: 60px;
  }
}
</style>
