<template>
  <div class="flex justify-center">
    <span>拖拽文件/文件夹至下方区域</span>
    <div
      :class="{
        flex:true,
        'full-width': true,
        'column': empty,
        'items-center': empty,
      }"
      style="height: 80vh;overflow-y: scroll"
      @drop="onDrop"
      @dragenter="onDropEnter"
      @dragover="onDropOver"
    >

      <div class="full-width">
        <file-card
          v-for="(record, index) of fileRecords"
          :key="record.name"
          :record="record"
          @remove="$emit('remove', record, index)"
          @upload="$emit('upload', record, index)"
          @copy="$emit('copy', record, index)"
          @copyMarkdown="$emit('copyMarkdown', record, index)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent} from '@vue/composition-api'
  import FileCard from './FileCard.vue'
  import {FileRecord} from 'src/common';

  type Props = {
    fileRecords: FileRecord[];
    fileResults: [];
  }

  export default defineComponent<Props>({
    name: 'UploadArea',
    components: {
      FileCard
    },
    props: {
      fileRecords: {
        type: Array,
        required: true,
      },
    },
    setup({fileRecords}, context) {
      const {root, emit} = context
      const {$q} = root

      const empty = computed(() => fileRecords.length === 0)

      const onDrop = (e: DragEvent) => {
        e.preventDefault()
        Object.keys(e.dataTransfer.files)
          .forEach(key => {
            handleFileSelect(e.dataTransfer.files[key])
          })
      }

      const onDropOver = (e: DragEvent) => {
        e.preventDefault();
      }

      const onDropEnter = (e) => {
        e.preventDefault();
      }

      const handleFileSelect = (file: File) => {
        emit('fileSelected', file)
      }

      return {
        empty,
        onDrop,
        onDropOver,
        onDropEnter,
        handleFileSelect
      }
    }
  })
</script>

<style>

</style>
