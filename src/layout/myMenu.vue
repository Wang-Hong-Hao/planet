<template>
  <span class="nav">
    <span v-for="(item, index) in menu" :key="index" class="space-s-l gap-s-r">
      <router-link :to="item.path">{{ (item.title, item.path) }}</router-link>
    </span>
    <span class="avatar gap-l-l">
      <span />
    </span>
  </span>
</template>

<script lang="ts" setup>
import { menuList } from "@/setting";
import { ref, reactive } from "vue";

const menu = ref(menuList);
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  background-color: var(--bgColor);

  .avatar {
    span {
      display: inline-block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: black;
    }
  }
}
</style>
