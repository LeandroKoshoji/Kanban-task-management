<template>
  <div class="textarea-wrapper">
    <label :for="props.name" class="label">
      <textarea
        v-model.trim="textArea"
        :name="props.name"
        :placeholder="props.placeholder"
        :id="props.name"
        cols="30"
        rows="5"
        class="textarea"
        :class="themeStore.theme"
        :maxlength="props.maxLength"
      ></textarea>
    </label>
    <div class="length-container">
      <span class="body-m">{{ textLength }} / {{ props.maxLength }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

interface Props {
  name: string
  maxLength: number
  placeholder?: string
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (event: 'emitsText', text: string): void
}>()

const textArea = ref('')
const textLength = ref(0)

watch(textArea, (currentValue) => {
  textLength.value = currentValue.length
  emits('emitsText', currentValue)
})
</script>

<style scoped lang="scss">
.textarea-wrapper {
  width: 100%;

  .label {
    border: 1px solid var(--color-medium-grey);
    border-radius: var(--border-radius);
    display: flex;
    width: 100%;
    padding: 8px 16px;

    .textarea {
      width: 100%;
      max-height: 416px;
      background-color: transparent;
      border: none;
      outline: none;

      &::-webkit-scrollbar {
        width: 1px;
      }

      &::placeholder {
        color: var(--color-medium-grey);
      }
      &.dark {
        color: var(--color-white);
      }
    }
  }
  .length-container {
    text-align: right;
  }
}
</style>
