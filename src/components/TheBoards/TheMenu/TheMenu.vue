<template>
  <div class="wrapper">
    <div class="menu" :class="themeStore.theme" v-if="showMenu">
      <p class="boards-count body-m">ALL BOARDS (2)</p>
      <div class="board-names-options">
        <MenuOption
          v-for="board in boards.boards"
          :key="board.id"
          :name="board.name"
          icon="board"
          :selected="board.id === 1"
        />
        <MenuOption name="+Create New Board" icon="board" />
      </div>
      <div class="theme-wrapper">
        <ThemeSwitcher />
      </div>
      <MenuOption name="Hide Side Bar" icon="hide" @optionClick="closeMenu" />
    </div>
    <div v-if="!showMenu" class="toggle-menu" @click="openMenu">
      <img
        :src="require('../../../assets/icons/icon-hide-sidebar.svg')"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher.vue'
import MenuOption from '@/components/TheBoards/TheMenu/MenuOption/MenuOption.vue'
import { useThemeStore } from '@/stores/theme'
import { ref, defineEmits } from 'vue'

import { data as boards } from '../../../data.js'

const showMenu = ref(true)

defineEmits<{
  (event: 'closeMenu'): void
}>()

const openMenu = () => {
  showMenu.value = true
}
const closeMenu = () => {
  showMenu.value = false
}
const themeStore = useThemeStore()
</script>

<style scoped lang="scss">
@import './TheMenu.scss';
</style>
