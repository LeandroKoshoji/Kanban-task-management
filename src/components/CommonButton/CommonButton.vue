<template>
  <button
    class="heading-m"
    :class="{
      [heightSize]: true,
      [widthSize]: true,
      ['btn-color-' + color]: true
    }"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
interface Props {
  heightSize: string
  widthSize: string
  color: string
}
const props = defineProps<Props>()
</script>

<style scoped lang="scss">
@import './CommonButton.scss';
</style>
