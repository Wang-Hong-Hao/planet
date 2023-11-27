<template>
  <div id="search">
    <button type="button" class="search-Button" aria-label="Search" @click="search">
      <span class="search-Button-Container">
        <svg width="20" height="20" class="search-Icon" viewBox="0 0 20 20">
          <path
            d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
            stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="search-Button-Placeholder">Search</span>
      </span>
      <span class="search-Button-Keys">
        <kbd>⌘</kbd>
        <kbd>K</kbd>
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAppStore } from '@/store/app'
export default defineComponent({
  setup() {

    const search = function () {
      const userAppStore = useAppStore()
      userAppStore.toggleSearch()
    }
    return { search };
  },
});
</script>

<style scoped lang="scss">
.search-Button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 140px;
  height: 40px;
  background-color: var(--backgroundColor);
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  border-image: initial;
  border-radius: 8px;
  padding: 0px 10px 0px 12px;
  color: var(--fontColor);
  font-size: 14px;
  transition: all 0.3s;
}

.search-Button:hover {
  border: 1px solid var(--accentColour);
}

.search-Icon {

  width: 14px;
  height: 14px;
  margin-right: 8px;
  vertical-align: middle;
}

.search-Button-Keys {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 30px;
  border: 1px solid var(--layerColor);
  border-radius: 3px;
  padding: 0 4px;
}
</style>
