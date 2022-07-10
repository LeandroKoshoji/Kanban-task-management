<template>
  <Draggable class="task-card" :class="themeStore.theme">
    <p class="task-title heading-l">{{ props.task?.title }}</p>
    <p class="subtasks body-m">{{ subtasksStatus }}</p>
  </Draggable>
</template>

<script setup lang="ts">
import { Draggable } from 'vue3-smooth-dnd'
import { computed, defineProps } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { ITask } from '@/types/tasks.interface'

const themeStore = useThemeStore()
interface Props {
  task: ITask
}
const props = defineProps<Props>()

const subtasksStatus = computed(() => {
  const subtasks = props.task.subtasks

  if (!subtasks.length) return ''
  const subtasksAmount = subtasks?.length
  const completed = subtasks?.filter((s) => s.isCompleted)

  return `${completed?.length} of ${subtasksAmount} subtasks`
})
</script>

<style scoped lang="scss">
.task-card {
  width: 100%;
  min-height: 88px;
  border-radius: var(--border-radius);
  background-color: var(--color-white);
  padding: 23px 16px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;

  &.dark {
    background-color: var(--color-dark-grey);
    color: var(--color-white);
  }

  .subtasks {
    color: var(--color-medium-grey);
  }
}
</style>
