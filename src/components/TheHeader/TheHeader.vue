<template>
  <header :class="themeStore.theme">
    <div class="logo">
      <img :src="logoToRender" alt="Logo" class="logo-img" />
    </div>
    <div class="board-infos">
      <p class="board-name" :class="boardNameInfos.cssClass">
        {{ boardNameInfos.name }}
        <img :src="icons.arrowDown" alt="" />
      </p>
      <CommonButton heightSize="small" widthSize="small" color="primary">
        <img
          v-if="commonButtonInfos.isMobile"
          :src="icons.plus"
          alt="Add task icon"
        />
        <span v-else> {{ commonButtonInfos.text }} </span>
      </CommonButton>
      <DotMenu
        class="dot-menu"
        :options="dotMenuInfos.options"
        orientation="to-left"
        :menuBackgroundColor="dotMenuInfos.bgColor"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import CommonButton from '@/components/CommonButton/CommonButton.vue'
import DotMenu from '../DotMenu/DotMenu.vue'
import { computed, onBeforeMount, ref } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const outerWidth = ref()
const isMobile = ref()

const icons = computed(() => ({
  darkMode: require('../../assets/icons/logo-dark.svg'),
  lightMode: require('../../assets/icons/logo-light.svg'),
  mobile: require('../../assets/icons/logo-mobile.svg'),
  plus: require('../../assets/icons/icon-add-task-mobile.svg'),
  arrowUp: require('../../assets/icons/icon-chevron-up.svg'),
  arrowDown: require('../../assets/icons/icon-chevron-down.svg')
}))

const dotMenuInfos = computed(() => {
  const bgColor = themeStore.isDarkMode ? 'very-dark-grey' : 'white'
  const options = [
    { id: 1, content: 'Edit Task', colorVariable: 'medium-grey' },
    { id: 2, content: 'Delete Task', colorVariable: 'red' }
  ]
  return { options, bgColor }
})

const logoToRender = computed(() => {
  if (isMobile.value) return icons.value.mobile
  if (themeStore.isDarkMode) return icons.value.darkMode
  return icons.value.lightMode
})

const boardNameInfos = computed(() => {
  const cssClass = isMobile.value ? 'heading-l' : 'heading-xl'
  const name = 'Plataforma Launch'
  return {
    cssClass,
    name
  }
})

const commonButtonInfos = computed(() => {
  const text = '+Add New Task'
  return {
    text,
    isMobile: isMobile.value
  }
})

const handleWindowOuterWidth = () => {
  outerWidth.value = window.outerWidth
  isMobile.value = outerWidth.value <= 540
}

onBeforeMount(() => {
  handleWindowOuterWidth()
  window.addEventListener('resize', handleWindowOuterWidth)
})
</script>

<style scoped lang="scss">
@import './TheHeader.scss';
</style>
