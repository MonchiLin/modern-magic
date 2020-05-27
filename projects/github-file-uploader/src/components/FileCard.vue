<template>
  <div class="full-width file-card flex column justify-center">
    <div class="flex row justify-between items-center full-width">
      <q-icon class="animation-icon-border" size="md" name="r_cancel" @click="$emit('remove')"/>
      <p class="self-center q-ma-none">{{file.name}}</p>

      <div>
        <q-circular-progress
          v-if="file.uploading && !file.uploaded"
          indeterminate
          size="md"
          color="white"
        />
        <q-icon v-if="!file.uploading && !file.uploaded" class="animation-icon-border" size="md" name="r_publish"
                @click="$emit('upload')"
        />
        <q-icon v-if="!file.uploading && file.uploaded" class="animation-icon-border" size="md" name="link"
                @click="$emit('copy')"
        />
      </div>
    </div>
    <div class="q-my-sm full-width">
      <q-linear-progress :indeterminate="file.uploading"/>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref} from '@vue/composition-api'
  import {FileRecord} from "src/common";

  export default defineComponent<{file:FileRecord}>({
    name: "FileCard",
    props: {
      file: {
        required: true,
      }
    },
    setup(props, context) {

      return {
      }
    }

  })


</script>

<style lang="scss" scoped>
  .file-card {
    background: linear-gradient(-45deg, #908e8e, #c2b0b6);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    border-radius: 5px;
    height: 60px;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
