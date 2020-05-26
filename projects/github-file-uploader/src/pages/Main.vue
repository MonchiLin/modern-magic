<template>
  <Uploader/>
</template>

<script lang="ts">
  import {defineComponent, ref,} from '@vue/composition-api'
  import {githubApi} from "src/api";
  import Uploader from "src/components/Uploader.vue";
  import {FileRecord} from "src/common";

  export default defineComponent({
    components: {
      Uploader
    },
    setup(props, context) {
      const fileRecords = ref([])
      const uploader = ref(null)
      const request = context.root.$axios
      const dragging = ref(false)

      const onAdded = async (fileRecord: FileRecord) => {

      }

      const filesSelected = function (fileRecordsNewlySelected) {
        fileRecords.value = fileRecords.value.concat(fileRecordsNewlySelected)
        fileRecordsNewlySelected.forEach(onAdded)
      }

      const fileInput = function (fileRecordsNewlySelected) {
        console.log(fileRecordsNewlySelected)
      }

      return {
        uploader,
        fileRecords,
        onAdded,
        filesSelected,
        fileInput,
        dragging
      }
    }
  })
</script>

<style>

</style>
