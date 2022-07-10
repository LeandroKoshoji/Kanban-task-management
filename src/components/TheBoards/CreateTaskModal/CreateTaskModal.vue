<template>
  <CommonModal @outerClick="boardStore.closeCreateTaskModal">
    <p class="title heading-l">Add New Task</p>
    <div class="task-name-container">
      <p class="container-title body-m">Title</p>
      <CommonInputText
        name="boardName"
        :disabled="false"
        placeholder="e.g Web Desiner"
        @emitsText="setTaskTitle"
        :valid="createTask.error"
      />
    </div>
    <div class="task-description-container">
      <p class="container-title body-m">Description</p>
      <CommonTextArea
        name="taskDescription"
        :maxLength="255"
        placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
        @emitsText="setTaskDescription"
      />
    </div>
    <div class="task-substasks-container">
      <p class="container-title body-m">Subtasks</p>
      <CommonInputText
        v-for="subtask in createTask.subtasks"
        :key="subtask.id"
        :id="subtask.id"
        :name="`subTask-${subtask.id}`"
        :disabled="false"
        placeholder="Make coffee"
        :showRemoveOption="true"
        @removeOption="removeSubtask"
        @emitsText="setSubtaskTitle"
        :valid="subtask.error"
      />
      <CommonButton
        heightSize="medium"
        widthSize="full"
        color="secondary"
        @click="addSubtask"
      >
        +Add New Subtask
      </CommonButton>
    </div>
    <div class="task-status-container">
      <p class="container-title body-m">Status</p>
      <CommonSelect
        :options="boardColumns"
        :defaultSelected="true"
        @optionClick="setTaskStatus"
      />
    </div>
    <CommonButton
      heightSize="medium"
      widthSize="full"
      color="primary"
      @click="saveChanges"
    >
      Create Task
    </CommonButton>
  </CommonModal>
</template>

<script setup lang="ts">
import CommonModal from '@/components/CommonModal/CommonModal.vue'
import CommonInputText from '@/components/CommonInputText/CommonInputText.vue'
import CommonTextArea from '@/components/CommonTextArea/CommonTextArea.vue'
import CommonSelect from '@/components/CommonSelect/CommonSelect.vue'
import CommonButton from '@/components/CommonButton/CommonButton.vue'
import { generateID } from '@/utils'
import { useBoardStore } from '@/stores/boards'
import { computed, ref } from 'vue'

const boardStore = useBoardStore()

interface ISubtask {
  id: number
  title: string
  isCompleted: boolean
  error: boolean
}
interface ICreateTask {
  id: number
  title: string
  description: string
  subtasks: ISubtask[]
  status: number
  error: boolean
}
interface ITextObject {
  id?: number
  text: string
}

const createTask = ref<ICreateTask>({
  id: generateID(),
  title: '',
  description: '',
  subtasks: [],
  status: generateID(),
  error: false
})
const boardColumns = computed(() => {
  const columns = boardStore.selected?.columns
  if (!columns) return []

  const remapedColumns = columns.map((c) => ({ id: c.id, name: c.name }))
  return remapedColumns
})
const setTaskTitle = ({ text }: { text: string }) => {
  createTask.value.title = text
  createTask.value.error = false
}
const setTaskDescription = (text: string) => {
  createTask.value.description = text
}
const setSubtaskTitle = ({ id, text }: ITextObject) => {
  const subtask = createTask.value.subtasks.find((s) => s.id === id)
  if (!subtask) return
  subtask.title = text
  subtask.error = false
}
const setTaskStatus = (id: number) => {
  const columnId = id
  createTask.value.status = columnId
}

const addSubtask = () => {
  const id = generateID()

  createTask.value.subtasks.push({
    id,
    title: '',
    isCompleted: false,
    error: false
  })
}
const removeSubtask = (id?: number) => {
  const filteredSubtasks = createTask.value.subtasks.filter((s) => s.id !== id)
  createTask.value.subtasks = filteredSubtasks
}

const saveChanges = () => {
  const taskId = createTask.value.id
  const taskTitle = createTask.value.title
  const taskDescription = createTask.value.description
  const taskStatus = createTask.value.status
  const taskSubtasks = createTask.value.subtasks
  const subtasksWithNoTitle = taskSubtasks.filter((s) => s.title === '')

  if (!taskTitle) {
    createTask.value.error = true
    return
  }

  if (subtasksWithNoTitle.length) {
    subtasksWithNoTitle.forEach((s) => (s.error = true))
    return
  }

  const parameters = {
    id: taskId,
    title: taskTitle,
    description: taskDescription,
    subtasks: taskSubtasks.map((t) => ({
      id: t.id,
      title: t.title,
      isCompleted: t.isCompleted
    })),
    status: taskStatus
  }

  boardStore.createTask(parameters)
}
</script>

<style scoped lang="scss">
.title,
.task-name-container,
.task-description-container,
.task-substasks-container,
.task-status-container {
  margin-bottom: 24px;
}

.task-substasks-container > * {
  margin-bottom: 12px;
}

.container-title {
  margin-bottom: 8px;
}
</style>
