<template>
  <CommonModal @outerClick="boardStore.closeCreateBoardModal">
    <p class="title heading-l">Add New Board</p>
    <div class="board-name-container">
      <p class="container-title body-m">Board Name</p>
      <CommonInputText
        name="boardName"
        :disabled="false"
        placeholder="e.g Web Desiner"
        @emitsText="setBoardName"
        :valid="createBoard.error"
      />
    </div>

    <div class="board-columns-container">
      <p class="container-title body-m">Board Columns</p>
      <div class="columns-container" v-if="createBoard.columns.length">
        <CommonInputText
          v-for="column in createBoard.columns"
          :key="column.id"
          :id="column.id"
          :name="`boardColumn-${column.id}`"
          :disabled="false"
          :showRemoveOption="true"
          @removeOption="removeColumn"
          placeholder="e.g Todo"
          @emitsText="setBoardColumn"
          :valid="column.error"
        />
      </div>
      <CommonButton
        class="addColumnButton"
        heightSize="medium"
        widthSize="full"
        color="secondary"
        @click="addColumn"
      >
        +Add New Column
      </CommonButton>
    </div>
    <CommonButton
      heightSize="medium"
      widthSize="full"
      color="primary"
      @click="saveChanges"
    >
      Save Changes
    </CommonButton>
  </CommonModal>
</template>

<script setup lang="ts">
import CommonModal from '@/components/CommonModal/CommonModal.vue'
import CommonInputText from '@/components/CommonInputText/CommonInputText.vue'
import CommonButton from '@/components/CommonButton/CommonButton.vue'
import { generateID } from '@/utils'
import { useBoardStore } from '@/stores/boards'
import { ref } from 'vue'

const boardStore = useBoardStore()

interface IColumn {
  id: number
  name: string
  error: boolean
}
interface ICreateBoard {
  name: string
  columns: IColumn[]
  error: boolean
}
interface ITextObject {
  id?: number
  text: string
}

const createBoard = ref<ICreateBoard>({
  name: '',
  columns: [],
  error: false
})

const setBoardName = ({ text }: { text: string }) => {
  createBoard.value.name = text
  createBoard.value.error = false
}
const setBoardColumn = ({ id, text }: ITextObject) => {
  const column = createBoard.value.columns.find((c) => c.id === id)
  if (!column) return
  column.name = text
  column.error = false
}
const addColumn = () => {
  const id = generateID()
  createBoard.value.columns.push({ id, name: '', error: false })
}
const removeColumn = (id?: number) => {
  const filteredColumns = createBoard.value.columns.filter((c) => c.id !== id)
  createBoard.value.columns = filteredColumns
}

const saveChanges = () => {
  const boardName = createBoard.value.name
  const boardColumns = createBoard.value.columns
  const isNameEmpty = createBoard.value.name === ''
  const columnsWithNoName = boardColumns.filter((c) => c.name === '')

  if (isNameEmpty) {
    createBoard.value.error = true
    return
  }

  if (columnsWithNoName.length) {
    columnsWithNoName.forEach((c) => (c.error = true))
    return
  }

  const parameters = {
    name: boardName,
    columns: boardColumns.map((c) => ({ id: c.id, name: c.name }))
  }

  console.log({ parameters })
}
</script>

<style scoped lang="scss">
.title,
.board-name-container,
.board-columns-container {
  margin-bottom: 24px;

  .columns-container > * {
    margin-bottom: 12px;
  }
}

.container-title {
  margin-bottom: 8px;
}
</style>
