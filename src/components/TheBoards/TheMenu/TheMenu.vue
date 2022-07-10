<template>
  <div class="menu-wrapper">
    <div class="menu" v-if="menuStore.menu" :class="themeStore.theme">
      <p class="boards-count body-m">ALL BOARDS ({{ boardsInfo.quantity }})</p>
      <div class="board-names-options">
        <MenuOption
          v-for="board in boardsInfo.boards"
          :key="board.id"
          :id="board.id"
          :name="board.name"
          icon="board"
          :selected="boardsInfo.selectedId === board.id"
          @optionClick="selectBoard"
        />
        <MenuOption
          name="+Create New Board"
          icon="board"
          @click="boardStore.openCreateBoardModal"
        />
      </div>
      <div class="theme-wrapper">
        <ThemeSwitcher />
      </div>
      <MenuOption
        name="Hide Side Bar"
        icon="hide"
        @optionClick="menuStore.closeMenu"
        v-if="!isMobile"
      />
    </div>
    <div
      v-if="!menuStore.menu && !isMobile"
      class="toggle-menu"
      :class="themeStore.theme"
      @click="menuStore.openMenu"
    >
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
import { useBoardStore } from '@/stores/boards'
import { useMenuStore } from '@/stores/menu'
import { ref, computed, onBeforeMount } from 'vue'

const menuStore = useMenuStore()
const outerWidth = ref()
const isMobile = ref()

const themeStore = useThemeStore()
const boardStore = useBoardStore()

const boardsInfo = computed(() => ({
  selectedId: boardStore.selected?.id,
  boards: boardStore.boards,
  quantity: boardStore.boardsQuantity
}))

const selectBoard = (id?: number) => {
  boardStore.selectBoard(id)
}
const handleWindowOuterWidth = () => {
  outerWidth.value = window.outerWidth
  isMobile.value = outerWidth.value <= 540
  if (isMobile.value) {
    menuStore.closeMenu()
  }
}

onBeforeMount(() => {
  handleWindowOuterWidth()
  window.addEventListener('resize', handleWindowOuterWidth)
})
//TODO: Make 'createBoard' function
</script>

<style scoped lang="scss">
@import './TheMenu.scss';
</style>
