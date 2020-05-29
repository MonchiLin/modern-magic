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
      style="min-height: 80vh;"
      @drop="onDrop"
      @dragenter="onDropEnter"
      @dragover="onDropOver"
    >

      <div class="full-width">
        <file-card
          v-for="(file, index) of fileRecords"
          :key="file.name"
          :file="file"
          @remove="$emit('remove', file, index)"
          @upload="$emit('upload', file, index)"
          @copy="$emit('copy', file, index)"
        />
      </div>

      <q-btn
        v-foxus="'手动上传文件'"
        color="deep-orange"
        :style="{
          width: empty ? '160px': '100%',
          height: '40px',
        }" glossy push
        @click="triggerSelect"
      >
        <div class="row items-center no-wrap">
          <q-icon left name="map"/>
          <div class="text-center">浏览文件</div>
        </div>
      </q-btn>

      <q-file ref="QFile" style="display: none;" hidden @input="handleFileSelect"/>

    </div>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, ref} from '@vue/composition-api'
  import FileCard from './FileCard.vue'
  import {FileRecord, getFileRecord} from 'src/common';
  import {FileMaxSize} from "src/config";

  type Props = {
    fileRecords: FileRecord[];
    fileResults: [];
  }

  export default defineComponent<Props>({
    name: "Uploader",
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

      const QFile = ref<any>()
      const empty = computed(() => fileRecords.length === 0)

      const triggerSelect = (e) => {
        QFile.value.pickFiles()
      }

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
        if (file.size > FileMaxSize) {
          $q.notify({message: `文件 【 ${file.name} 】 大于 100M`, type: 'negative'})
          return
        }
        if (fileRecords.findIndex(record => record.name === file.name) !== -1) {
          return;
        }
        emit('fileSelected', getFileRecord(file))
      }

      return {
        QFile,
        empty,
        onDrop,
        onDropOver,
        onDropEnter,
        triggerSelect,
        handleFileSelect
      }
    }
  })
</script>

<style>

</style>
