<template>
  <VueFileAgent
    theme="list"
    :maxFiles="14"
    :multiple="true"
    :deletable="true"
    :editable="true"
    :meta="true"
    helpText="拖拽文件到这里"
    :value="fileRecords"
    @select="filesSelected"
  >
  </VueFileAgent>
</template>

<script lang="ts">
  import {defineComponent, ref,} from '@vue/composition-api'
  import {githubApi} from "src/api";

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  export default defineComponent({
    setup(props, context) {
      const fileRecords = ref([])
      const uploader = ref(null)
      const request = context.root.$axios
      const dragging = ref(false)

      const onAdded = async (files) => {
        const file = files[0]
        const base64 = (await toBase64(file)).toString().split(",")[1]

        request(
          githubApi.createFile("MonchiLin", "arsenal", file.name, {
            message: "测试, " + new Date().toLocaleString(),
            content: base64,
          }))
          .then(res => {

          })
          .catch(err => {

          })

      }

      const filesSelected = function (fileRecordsNewlySelected) {
        // const newSelected = fileRecordsNewlySelected.map(item => {
        //   debugger
        // })
        fileRecords.value = fileRecords.value.concat(fileRecordsNewlySelected)
      }

      const fileInput = function (fileRecordsNewlySelected) {
        console.log(fileRecordsNewlySelected)
      }

      return {
        uploader,
        fileRecords,
        onAdded,
        handleDrop,
        filesSelected,
        fileInput,
        dragging
      }
    }
  })
</script>

<style>

</style>
