<script setup lang="ts">
import {onMounted} from "vue";
import {test} from 'glsl-parser-wasm'
import {ShaderStage} from "./shader-stage";

onMounted(() => {
  const data: ShaderStage = test(`
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `)

  console.log(data.declarations[0].tag)
})

</script>

<template>

</template>

<style scoped>

</style>
