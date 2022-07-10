<template>
  <div class="select-wrapper">
    <div class="select-container" @click="toogleShowOptions">
      <p class="select-text body-l">{{ selected?.name }}</p>
      <div class="arrow-container">
        <img
          :src="require('../../assets/icons/icon-chevron-down.svg')"
          alt="select arrow down"
          v-if="!showOptions"
        />
        <img
          :src="require('../../assets/icons/icon-chevron-up.svg')"
          alt="select arrow up"
          v-else
        />
      </div>
    </div>
    <div class="option-container" :class="themeStore.theme" v-if="showOptions">
      <p
        class="option body-l"
        :class="themeStore.theme"
        v-for="option in options"
        :key="option.id"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { defineProps, defineEmits, ref, onBeforeMount } from 'vue'

const themeStore = useThemeStore()

interface ISelected {
  id: number
  name: string
}
interface Props {
  defaultSelected: boolean
  options: ISelected[]
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (event: 'optionClick', id: number): void
}>()

const selected = ref<ISelected>()
const showOptions = ref(false)

const toogleShowOptions = () => {
  showOptions.value = !showOptions.value
}

const selectOption = (option: ISelected) => {
  selected.value = option
  showOptions.value = false
  emits('optionClick', option.id)
}

onBeforeMount(() => {
  if (props.defaultSelected) {
    const firstOption = props.options[0]
    selected.value = firstOption
    emits('optionClick', firstOption.id)
  }
})
</script>

<style scoped lang="scss">
.select-container {
  border-radius: var(--border-radius);
  border: 1px solid var(--color-medium-grey);
  padding: 8px 16px;
  display: flex;
  align-items: center;
  cursor: pointer;

  .select-text {
    flex: 1;
  }
}

.option-container {
  border-radius: var(--border-radius);
  background-color: var(--color-light-grey);
  padding: 16px 0px;
  z-index: 99;
  position: absolute;
  left: 0;
  right: 0;
  top: 48px;
  &.dark {
    background-color: var(--color-very-dark-grey);
    color: var(--color-white);
  }

  .option {
    cursor: pointer;
    padding: 8px 16px;

    &:hover {
      background-color: var(--color-white);
    }
    &.dark:hover {
      background-color: var(--color-dark-grey);
    }
  }
}
</style>
