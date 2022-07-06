<template>
  <div class="board" :class="themeStore.theme">board</div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<style scoped lang="scss">
@import './TheBoard.scss';
</style>
