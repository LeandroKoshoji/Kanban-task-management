<template>
  <div class="input-text-wrapper">
    <label :for="props.name" class="label" :class="{ error: props.valid }">
      <input
        type="text"
        class="input body-l"
        :class="themeStore.theme"
        v-model.trim="inputText"
        :placeholder="props.placeholder"
        :id="props.name"
        :disabled="props.disabled"
      />
      <p class="warning" v-if="props.valid">Can't be empty</p>
    </label>

    <div
      class="remove-option"
      v-if="props.showRemoveOption"
      @click="emits('removeOption', props.id)"
    >
      <img
        :src="require('../../assets/icons/icon-cross.svg')"
        alt="remove option"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const inputText = ref('')

interface Props {
  id?: number
  name: string
  placeholder: string
  disabled: boolean
  valid: boolean
  showRemoveOption?: boolean
}
interface ITextObject {
  id?: number
  text: string
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (event: 'removeOption', id?: number): void
  (event: 'emitsText', textObject: ITextObject): ITextObject
}>()

watch(inputText, (currentValue) => {
  emits('emitsText', { id: props.id, text: currentValue })
})
</script>

<style scoped lang="scss">
.input-text-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  .label {
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
    border: 1px solid var(--color-medium-grey);
    width: 100%;
    height: 100%;
    padding: 0 16px;

    .input {
      background-color: transparent;
      padding: 8px 0;
      border: none;
      outline: none;
      width: 100%;

      &::placeholder {
        color: var(--color-medium-grey);
      }
      &.dark {
        color: var(--color-white);
      }
    }

    &.error {
      border: 1px solid var(--color-red);
    }
    .warning {
      color: var(--color-red);
      white-space: nowrap;
    }
  }
  .remove-option {
    cursor: pointer;
    margin-left: 16px;
  }
}
</style>
