<template>
  <Draggable class="column-wrapper">
    <div class="column-tasks" v-if="props.tasksMode">
      <div class="title-container">
        <div class="title-circle">
          <input
            type="color"
            class="title-circle-input"
            v-model="circleColor"
          />
        </div>
        <p class="column-title heading-s">
          {{ props.columnName?.toUpperCase() }} ({{ props.tasks?.length }})
        </p>
      </div>
      <Container class="tasks-container">
        <TheTaskCard v-for="task in props.tasks" :key="task.id" :task="task" />
      </Container>
    </div>
  </Draggable>
</template>

<script setup lang="ts">
import TheTaskCard from '../TheTaskCard/TheTaskCard.vue'
import { Draggable, Container } from 'vue3-smooth-dnd'
import { defineProps, onBeforeMount, ref } from 'vue'
import { generateRandomColor } from '@/utils'
import { ITask } from '@/types/tasks.interface'

interface Props {
  columnName?: string
  tasks?: ITask[]
  tasksMode?: boolean
}

const props = defineProps<Props>()
const circleColor = ref()

onBeforeMount(() => {
  circleColor.value = generateRandomColor()
})
</script>

<style scoped lang="scss">
.column-wrapper {
  height: 100%;
  width: 280px;
  min-width: 280px;
  padding: 0 5px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 1px;
  }

  .column-tasks {
    .title-container {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      .title-circle {
        position: relative;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: v-bind(circleColor);

        &-input {
          position: absolute;
          width: inherit;
          height: inherit;
          opacity: 0;
          cursor: pointer;
        }
      }
      .column-title {
        padding-left: 15px;
        color: var(--color-medium-grey);
      }
    }

    .tasks-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
}
</style>
