import { defineStore } from 'pinia'

interface ITheme {
  theme: string
}

export const useThemeStore = defineStore('themeStore', {
  state: (): ITheme => ({
    theme: localStorage.getItem('theme') || 'light'
  }),
  getters: {
    isDarkMode: (state) => state.theme === 'dark'
  },
  actions: {
    changeTheme() {
      const isDarkMode = this.theme === 'dark'
      this.theme = isDarkMode ? 'light' : 'dark'
      localStorage.setItem('theme', this.theme)
    }
  }
})
