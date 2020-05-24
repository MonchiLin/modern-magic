<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import {defineComponent, onBeforeMount} from '@vue/composition-api'
  import {remote} from 'electron'

  export default defineComponent({
    setup(props, context) {
      onBeforeMount(() => {
        const appearance = remote.systemPreferences.getEffectiveAppearance()
        if (appearance === "dark") {
          context.root.$q.dark.set(true)
        }
      })
    }
  })
</script>
