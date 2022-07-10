<template>
  <div class="modal-wrapper">
    <div class="modal-outer" @click="$emit('outerClick')"></div>
    <div class="modal-inner" :class="themeStore.theme">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { defineEmits } from 'vue'

const themeStore = useThemeStore()
defineEmits<{
  (event: 'outerClick'): void
}>()
</script>

<style scoped lang="scss">
.modal-wrapper {
  position: fixed;
  display: flex;
  inset: 0;
  z-index: 99;

  .modal-outer {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
  }

  .modal-inner {
    background-color: var(--color-white);
    border-radius: var(--border-radius);
    width: Min(90%, 480px);
    margin: auto;
    padding: 32px;

    &.dark {
      background-color: var(--color-dark-grey);
      color: var(--color-white);
    }
  }
}
</style>
