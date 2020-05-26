<template>
  <div class="flex justify-center">
    <span>拖拽文件/文件夹至下方区域</span>
    <div
      :class="{
        flex:true,
        'full-width': true,
        'column': empty,
        'justify-center': empty,
        'items-center': empty,
      }"
      style="border: gray 2px dashed;min-height: 20vh;"
      @drop="onDrop"
      @dragenter="onDropEnter"
      @dragover="onDropOver"
    >

      <div class="full-width">
        <file-card
          v-for="file of fileRecords"
          :key="file.name"
          :file="file"
          @remove="remove(file)"
          @upload="upload(file)"
        />
      </div>

      <q-btn
        color="deep-orange"
        :style="{
          width: empty ? '160px': '100%',
          height: '40px',
        }"
        glossy
        push
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
  import {githubApi} from "src/api";
  import {FileRecord, getFileRecord} from 'src/common';

  export default defineComponent({
    name: "Uploader",
    components: {
      FileCard
    },
    setup(props, context) {
      const {$axios} = context.root

      const fileRecords = ref<FileRecord[]>([])

      const QFile = ref<any>()
      const empty = computed(() => fileRecords.value.length === 0)

      const triggerSelect = (e) => {
        QFile.value.pickFiles()
      }

      const onDrop = (e: DragEvent) => {
        console.log("onDrop", e.dataTransfer.files)
        e.preventDefault()
        Object.keys(e.dataTransfer.files)
          .forEach(key => {
            handleFileSelect(e.dataTransfer.files[key])
          })
      }

      const onDropOver = (e: DragEvent) => {
        // console.log("onDropOver")
        e.preventDefault();
      }

      const onDropEnter = (e) => {
        // console.log("onDropEnter")
        e.preventDefault();
      }

      const upload = async (record: FileRecord) => {
        const [name, ext] = record.name.split(".")
        record.uploading = true

        $axios(
          githubApi.createFile("MonchiLin", "arsenal", name + new Date().getTime() + "." + ext, {
            message: "测试, " + new Date().getTime(),
            content: record.base64,
            committer: {
              name: "GithubFileUploader",
              email: "gfu@undefind.com"
            }
          }))
          .then(res => {
            record.uploaded = true
          })
          .catch(err => {
            record.error = err
          })
          .finally(() => {
            record.uploading = false
          })
      }

      const remove = (record: FileRecord) => {
        fileRecords.value = fileRecords.value
          .filter(item => item.name !== record.name)
      }

      const handleFileSelect = (file: File) => {
        fileRecords.value.push(getFileRecord(file))
      }

      return {
        fileRecords,
        QFile,
        empty,
        upload,
        remove,
        onDrop,
        onDropOver,
        onDropEnter,
        triggerSelect,
        handleFileSelect,
      }
    }
  })
</script>

<style>

</style>
