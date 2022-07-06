<template>
  <div
    class="menu-option-wrapper"
    :class="menuOptionsCssClass"
    @click="emitOptionClick"
  >
    <img
      :src="icons[props.icon]"
      alt="board icon"
      class="board-icon"
      :class="iconCssClass"
    />
    <span class="menu-option-text heading-m"> {{ props.name }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

type iconOption = 'board' | 'hide'
interface Props {
  id?: number
  icon: iconOption
  name: string
  selected?: boolean
}
const props = defineProps<Props>()

const emits = defineEmits<{
  (event: 'optionClick', id?: number): void
}>()

const icons = computed(() => ({
  board: require('../../../../assets/icons/icon-board.svg'),
  hide: require('../../../../assets/icons/icon-hide-sidebar.svg')
}))
const menuOptionsCssClass = computed(() => ({
  selected: props.selected,
  [themeStore.theme]: true
}))
const iconCssClass = computed(() => ({ selected: props.selected }))

const emitOptionClick = () => {
  emits('optionClick', props.id)
}
</script>

<style scoped lang="scss">
@import './MenuOption.scss';
</style>
