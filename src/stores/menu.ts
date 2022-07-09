import { defineStore } from 'pinia'

interface IMenu {
  showMenu: boolean
}

export const useMenuStore = defineStore('menuStore', {
  state: (): IMenu => ({
    showMenu: true
  }),
  getters: {
    menu: (state) => state.showMenu
  },
  actions: {
    openMenu() {
      this.showMenu = true
    },
    closeMenu() {
      this.showMenu = false
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
    }
  }
})
