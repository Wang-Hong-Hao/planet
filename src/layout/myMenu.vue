<template>
  <span class="nav">
    <span v-for="(item, index) in menu" :key="index" class="space-s-l gap-s-r">
      <router-link :to="item.path">{{ item.title }}</router-link>
    </span>
    <span class="avatar gap-l-l">
      <img src="@/assets/img/avatar.jpg">
    </span>
  </span>
</template>

<script lang="ts">
import { menuList } from "@/setting";
import { ref } from "vue";
export default {
  setup() {
    const menu = ref(menuList);

    return { menu }
  }
}

</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 3.75rem;
  padding: 0 20px;
  background-color: var(--layerColor);

  .avatar {
    line-height: 100%;

    img {
      display: inline-block;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background-color: black;
    }
  }
}
</style>
