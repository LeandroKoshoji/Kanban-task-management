<template>
  <div class="board" :class="themeStore.theme">
    <div class="columns-tasks-container" v-if="columnsDisplay.show">
      <Container orientation="horizontal" class="columns-container">
        <TheColumn
          v-for="item in boardColumns"
          :key="item.id"
          :columnName="item.name"
          :tasks="item.tasks"
          :tasksMode="true"
        />
      </Container>
    </div>
    <div class="empty-container" v-else>
      <div class="empty-content">
        <p class="heading-l">{{ columnsDisplay.text }}</p>
        <CommonButton
          v-if="columnsDisplay.btnShow"
          heightSize="medium"
          widthSize="small"
          color="primary"
        >
          {{ columnsDisplay.btnText }}
        </CommonButton>
      </div>
    </div>

    <div class="column-create-container" v-if="columnsDisplay.show">
      <div class="column-create" :class="themeStore.theme">
        <p class="create-text heading-xl">+New Column</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheColumn from './TheColumn/TheColumn.vue'
import CommonButton from '@/components/CommonButton/CommonButton.vue'
import { useThemeStore } from '@/stores/theme'
import { useBoardStore } from '@/stores/boards'
import { Container } from 'vue3-smooth-dnd'
import { computed } from 'vue'

const themeStore = useThemeStore()
const boardStore = useBoardStore()

const boardColumns = computed(() => boardStore.$state.selected?.columns)
const columnsDisplay = computed(() => {
  const hasSelect = boardStore.$state.selected
  const hasSelectColumns = Boolean(boardStore.$state.selected?.columns?.length)
  const hasSelectBtnText = '+Add New Column'
  const hasSelectText =
    'This board is empty. Create a new column to get started.'
  const hasNoSelectText = 'Select a board to continue.'

  const hasBoard = Boolean(boardStore.boardsQuantity)
  const hasNoBoardBtnText = '+Create New Board'
  const hasNoBoard =
    'There is no boards yet. Create a new board to get started.'

  if (hasSelect && !hasSelectColumns)
    return {
      show: false,
      text: hasSelectText,
      btnShow: true,
      btnText: hasSelectBtnText
    }

  if (!hasBoard)
    return {
      show: false,
      text: hasNoBoard,
      btnShow: true,
      btnText: hasNoBoardBtnText
    }

  if (!hasSelect)
    return { show: false, text: hasNoSelectText, btnShow: false, btnText: '' }

  return { show: true }
})
</script>

<style scoped lang="scss">
@import './TheBoard.scss';
</style>
