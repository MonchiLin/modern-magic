<template>
  <div class="container">
    <div class="item item1 bg-blue-100"></div>
    <div class="item item2 bg-blue-300">
      <div class="bg-gray-300"></div>
    </div>
    <div class="item item3 bg-blue-500"></div>
    <a-input v-model="inputValue" @change="onChange" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, onMounted, reactive } from '@vue/composition-api'
  import { Md5 } from 'ts-md5/dist/md5'
  import { BD_APP_ID, BD_KEY } from "~/config/runtime.config";
  import qs from 'qs'

  type R = {
    src: "1"
    dst: "One"
  }

  type Res = {
    from: "zh"
    to: "en"
    trans_result: R[]
  }

  export default defineComponent({
    setup(props, {root}) {
      const inputValue = ref("")
      const message = ref('This is a message')

      onMounted(() => {
        window.onResponse = (e: Res) => {
          console.log("翻译 => ", e)
        }
      })

      const translator = ({q}) => {
        const salt = Math.random() * 1000 * new Date().getTime()
        const key = BD_KEY
        const appid = BD_APP_ID
        const md5 = new Md5();
        md5.appendStr(appid)
          .appendStr(q)
          .appendStr(salt.toString())
          .appendStr(key)

        const script = document.createElement("script")

        script.src = 'https://fanyi-api.baidu.com/api/trans/vip/translate?' + qs.stringify({
          from: "auto",
          to: "en",
          q,
          appid,
          salt,
          sign: md5.end(),
          callback: "onResponse"
        })

        document.body.appendChild(script)
      }

      const onChange = () => {
        translator({q: inputValue.value})
      }

      onMounted(() => {

      })

      return {
        inputValue,
        onChange,
        message
      }
    }
  })
</script>

<style>
  .container {
    display: grid;
  }

  div {
    width: 50px;
    height: 50px;
  }

</style>
