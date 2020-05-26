<template>
  <div class="full-width file-card flex column justify-center">
    <div class="flex row justify-between items-center full-width">
      <q-icon class="animation-icon-border" size="md" name="r_cancel" @click="$emit('remove')"/>
      <p class="self-center q-ma-none">{{file.name}}</p>
      <!--   v-if="file.uploading && !file.uploaded"   -->
      <div>
        <q-circular-progress
          v-if="showLoading"
          indeterminate
          size="md"
          color="white"
        />
        <q-icon v-if="!showLoading" class="animation-icon-border" size="md" name="r_publish"
                @click="showLoading = true"
        />
        <!--        @click="$emit('upload')"-->
      </div>
    </div>
    <div class="q-my-sm full-width">
      <q-linear-progress :indeterminate="file.uploading"/>
    </div>
  </div>
</template>

<script>
  import {defineComponent, ref} from '@vue/composition-api'

  export default defineComponent({
    name: "FileCard",
    props: {
      file: {
        required: true,
      }
    },
    setup(props, context) {
      const showLoading = ref(false)
      // const onClick = showLoading.value = true

      return {
        showLoading,
      }
    }

  })


</script>

<style lang="scss" scoped>
  .file-card {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
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
