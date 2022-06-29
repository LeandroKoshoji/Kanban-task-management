<template>
  <div class="wrapper" :class="themeMode">
    <img :src="icons.sun" alt="Sun - Light Theme" />
    <TheSwitch />
    <img :src="icons.moon" alt="Moon - Dark Theme" />
  </div>
</template>

<script setup lang="ts">
import TheSwitch from '@/components/TheSwitch/TheSwitch.vue'
import { useThemeStore } from '@/stores/theme'
import { computed } from 'vue'

interface Icons {
  sun: string
  moon: string
}

const themeStore = useThemeStore()
const icons = computed<Icons>(() => ({
  sun: require('../../assets/icons/icon-light-theme.svg'),
  moon: require('../../assets/icons/icon-dark-theme.svg')
}))

const themeMode = computed(() => themeStore.theme)
</script>

<style scoped lang="scss">
@import './ThemeSwitcher.scss';
</style>
