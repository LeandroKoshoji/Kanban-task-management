<template>
  <div>
    <img
      :src="dotIcon"
      alt="Dot Menu Icon"
      class="dot-icon"
      @click="toggleOptions"
    />
    <div
      class="menu-options"
      v-if="showOptions"
      :class="{
        [orientation]: orientation,
        ['bg-' + menuBackgroundColor]: true
      }"
    >
      <p
        v-for="option in props.options"
        :key="option.id"
        class="option body-l"
        :class="{ ['option-color-' + option.colorVariable]: true }"
        @click="$emit('optionClick', option.id)"
      >
        {{ option.content }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, ref } from 'vue'

interface Option {
  id: number
  content: string
  colorVariable?: string
}
type Orientation = 'to-left' | 'to-right' | 'to-center'
interface Props {
  options: Option[]
  orientation: Orientation
  menuBackgroundColor?: string
}
const props = defineProps<Props>()

defineEmits<{
  (event: 'optionClick', id: number): void
}>()

const showOptions = ref(false)

const toggleOptions = () => {
  showOptions.value = !showOptions.value
}
const dotIcon = computed(() =>
  require('../../assets/icons/icon-vertical-ellipsis.svg')
)
</script>

<style scoped lang="scss">
@import './DotMenu.scss';
</style>
