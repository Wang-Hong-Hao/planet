<template>
  <span class="nav">
    <search style="margin-right: 20px;" />
    <span class="theme" @click="toogleTheme">
      <svg v-if="appStore.theme === 'dark'" class="icon sun" aria-hidden="true">
        <use xlink:href="#icon-sun_line" />
      </svg>
      <svg v-else class="icon moon" aria-hidden="true">
        <use xlink:href="#icon-moon_line" />
      </svg>
    </span>
    <span class="avatar gap-l-l">
      <img src="@/assets/img/avatar.jpg">
    </span>
  </span>
</template>

<script lang="ts">
import { menuList } from "@/setting";
import { ref } from "vue";
import { useAppStore } from '@/store/app'
import search from '@/components/search/index.vue'
export default {
  components: {
    search
  },
  setup() {

    const appStore = useAppStore()
    const menu = ref(menuList);

    const toogleTheme = function () {
      appStore.toggleTheme()

    }

    return { menu, toogleTheme, appStore }
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

  .theme {
    height: 1.5em;
  }

  .sun {
    color: #fff;
  }

  .moon {
    color: #000;
  }

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
