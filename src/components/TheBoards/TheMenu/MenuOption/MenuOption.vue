<template>
  <div
    class="menu-option-wrapper"
    :class="{ selected: props.selected, [themeStore.theme]: true }"
    @click="$emit('optionClick')"
  >
    <img
      :src="icons[props.icon]"
      alt="board icon"
      class="board-icon"
      :class="{ selected: props.selected }"
    />
    <span class="menu-option-text heading-m"> {{ props.name }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue'
import { useThemeStore } from '../../../../stores/theme.ts'

const themeStore = useThemeStore()
interface Option {
  icon: string
  name: string
  selected?: boolean
}
const props = defineProps<Option>()
defineEmits<{
  (event: 'optionClick'): void
}>()
const icons = computed(() => ({
  board: require('../../../../assets/icons/icon-board.svg'),
  hide: require('../../../../assets/icons/icon-hide-sidebar.svg')
}))
</script>

<style scoped lang="scss">
@import './MenuOption.scss';
</style>
