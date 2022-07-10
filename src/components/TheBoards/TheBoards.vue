<template>
  <div class="boards">
    <TheMenu />
    <TheBoard />
    <CreateBoardModal v-if="boardStore.showCreateBoardModal" />
    <CreateTaskModal v-if="boardStore.showCreateTaskModal" />
  </div>
</template>

<script setup lang="ts">
import TheMenu from './TheMenu/TheMenu.vue'
import TheBoard from './TheBoard/TheBoard.vue'
import CreateBoardModal from './CreateBoardModal/CreateBoardModal.vue'
import CreateTaskModal from './CreateTaskModal/CreateTaskModal.vue'
import { useBoardStore } from '@/stores/boards'

const boardStore = useBoardStore()
</script>

<style scoped lang="scss">
@import './TheBoards.scss';
</style>
