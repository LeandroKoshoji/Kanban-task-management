<template>
  <CommonModal @outerClick="boardStore.closeCreateTaskModal">
    <p class="heading-l">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, aperiam.</p>
  </CommonModal>
</template>

<script setup lang="ts">
import CommonModal from '@/components/CommonModal/CommonModal.vue'
import CommonInputText from '@/components/CommonInputText/CommonInputText.vue'
import CommonButton from '@/components/CommonButton/CommonButton.vue'
// import { generateID } from '@/utils'
import { useBoardStore } from '@/stores/boards'
import { ref } from 'vue'

const boardStore =  useBoardStore()
</script>

<style scoped></style>
