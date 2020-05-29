<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import {defineComponent, onBeforeMount, onMounted} from '@vue/composition-api'
  import {remote} from 'electron'
  import {foxusInit} from "src/foxus";

  export default defineComponent({
    setup(props, context) {
      onBeforeMount(() => {
        const appearance = remote.systemPreferences.getEffectiveAppearance()
        if (appearance === "dark") {
          context.root.$q.dark.set(true)
        }
      })

      onMounted(() => {
        foxusInit()
      })

    }
  })
</script>
