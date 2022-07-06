<template>
  <div class="boards">
    <TheMenu />
    <TheBoard />
  </div>
</template>

<script setup lang="ts">
import TheMenu from './TheMenu/TheMenu.vue'
import TheBoard from './TheBoard/TheBoard.vue'
</script>

<style scoped lang="scss">
@import './TheBoards.scss';
</style>
