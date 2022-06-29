<template>
  <div>
    <input
      type="checkbox"
      id="switch-checkbox"
      class="switch-checkbox"
      v-model="switchValue"
      @change="switchAction"
    />
    <label for="switch-checkbox" class="switch-label">
      <div class="switch-ball"></div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const switchValue = ref(false)
const switchAction = () => {
  themeStore.changeTheme()
}

onBeforeMount(() => {
  if (themeStore.isDarkMode) {
    switchValue.value = true
  }
})
</script>

<style scoped lang="scss">
@import './TheSwitch.scss';
</style>
Í
