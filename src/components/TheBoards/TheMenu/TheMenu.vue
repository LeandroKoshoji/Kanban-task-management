<template>
  <div class="wrapper">
    <div class="menu" :class="themeStore.theme" v-if="showMenu">
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
import { useBoardStore } from '@/stores/boards'
import { ref, defineEmits, computed } from 'vue'

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
const boardStore = useBoardStore()

const boardsInfo = computed(() => ({
  selectedId: boardStore.selected?.id,
  boards: boardStore.boards,
  quantity: boardStore.boardsQuantity
}))

const selectBoard = (id?: number) => {
  boardStore.selectBoard(id)
}

//TODO: Make 'createBoard' function
</script>

<style scoped lang="scss">
@import './TheMenu.scss';
</style>
