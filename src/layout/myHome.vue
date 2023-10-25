<template>
  <div class="home">
    <header>
      <myMenu />
    </header>
    <div class="container">
      <slot />
    </div>
    <footer />
  </div>
</template>
<script lang="ts">
import myMenu from './myMenu.vue'

export default {
  components: {
    myMenu
  },
  setup() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--backgroundColor);

  header {
    height: 3.75rem;
  }

  .container {
    flex: 1;
    max-width: 39.375rem;
    margin: 0 auto;
    padding: 3.125rem 1.25rem 3.125rem 1.25rem;
  }

  footer {
    height: 3.75rem;
  }
}
</style>
