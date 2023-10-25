import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      theme: 'light',
    }
  },
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      const body = document.body
      body.setAttribute('data-theme', this.theme)
    }
  }
})
