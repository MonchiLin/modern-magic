<template>
  <div class="flex row justify-between items-center full-width record-card q-mb-lg q-px-md">
    <q-icon size="sm" :name="ionCloseOutline" @click="$emit('remove', record)"/>
    <p
      class="self-center q-ma-none overflow-hidden-y"
      style="width: 60%; white-space: nowrap;text-overflow: ellipsis;"
      :title="record.name"
    >
      {{record.name}}
    </p>
    <div>
      <q-circular-progress
        title="上传中..."
        v-if="record.uploading && !record.uploaded"
        v-foxus
        indeterminate
        size="md"
        color="white"
      />
      <q-icon v-if="!record.uploading && !record.uploaded" v-foxus size="sm" :name="ionCloudUpload"
              @click="$emit('upload', record)" title="上传"
      />
      <q-icon v-if="!record.uploading && record.uploaded" v-foxus size="sm" :name="ionClipboard"
              @click="$emit('copy', record)" title="复制"
      />
      <q-icon v-if="!record.uploading && record.uploaded && isImage" v-foxus size="sm" :name="ionLogoMarkdown"
              @click="$emit('copyMarkdown', record)" title="复制 Markdown"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, computed} from '@vue/composition-api'
  import {FileRecord} from 'src/common';
  import {ionCloudUpload, ionClipboard, ionCloseOutline, ionLogoMarkdown} from '@quasar/extras/ionicons-v5'

  const IMAGE_EXTS = ['.jpg', '.jpeg', '.bmp', '.png', '.gif']

  export default defineComponent<{ record: FileRecord }>({
    name: 'FileCard',
    props: {
      record: {
        required: true,
      }
    },
    setup({record}) {
      const isImage = computed(() => IMAGE_EXTS.includes(record.ext))

      return {
        isImage,
        ionCloudUpload,
        ionClipboard,
        ionCloseOutline,
        ionLogoMarkdown,
      }
    }
  })

</script>

<style lang="scss" scoped>
  .record-card {
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
