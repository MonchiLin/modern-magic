<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import {defineComponent, onBeforeMount, onMounted} from '@vue/composition-api'
  import {remote} from 'electron'
  import {foxusInit} from 'src/foxus';
  import {QVueGlobals} from 'quasar/dist/types/globals';
  const {nativeTheme} = remote

  function updateTheme($q:QVueGlobals) {
    $q.dark.set(nativeTheme.shouldUseDarkColors)
  }

  export default defineComponent({
    setup(props, context) {
      onBeforeMount(() => {
        remote.nativeTheme.on('updated', e => {
          updateTheme(context.root.$q)
        })
        updateTheme(context.root.$q)
      })

      onMounted(() => {
        foxusInit()
      })

    }
  })
</script>
