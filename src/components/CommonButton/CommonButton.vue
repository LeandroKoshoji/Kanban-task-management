<template>
  <button class="heading-m" :class="cssClass">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
interface Props {
  heightSize: string
  widthSize: string
  color: string
}
const props = defineProps<Props>()

const cssClass = computed(() => ({
  ['height-' + props.heightSize]: true,
  ['width-' + props.widthSize]: true,
  ['btn-color-' + props.color]: true
}))
</script>

<style scoped lang="scss">
@import './CommonButton.scss';
</style>
