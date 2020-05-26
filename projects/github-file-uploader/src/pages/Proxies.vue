<template>
  <div>
    <div>
      <span class="text-subtitle1 text-weight-regular">{{ipInfo}}</span>
    </div>
    <q-toggle v-model="enabledProxies" label="代理" @input="onSwitch"/>

    <div class="q-gutter-md">
      <q-select
        v-model="protocol"
        :disable="!enabledProxies"
        label="代理协议"
        transition-show="flip-up"
        transition-hide="flip-down"
        :options="PROTOCOLS"
        style="width: 250px"
      />

      <q-input
        v-model="host"
        :disable="!enabledProxies"
        clearable
        clear-icon="close"
        filled
        color="purple-12"
        label="主机"
        :rules="[
        val => !!val || '必须填写主机',
        val => val.split('.').length === 4 || '主机名不合法',
        val => val.split('.').filter(v => !v).length === 0 || '主机名不合法'
      ]"
      />

      <q-input
        v-model="port"
        :disable="!enabledProxies"
        clearable
        clear-icon="close"
        filled
        color="purple-12"
        label="端口"
      />

      <q-btn glossy label="Ping Github" no-caps @click="pingGithub"/>

      <p>{{pingGithubInfo}}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, onMounted, ref, watch} from '@vue/composition-api'
  import {debounce} from 'quasar'
  import {remote} from "electron";
  import {commonApi, githubApi} from "src/api";

  const PROTOCOLS = ["http", "https"]

  export default defineComponent({
    setup(props, context) {
      const {$q, $axios} = context.root

      const protocol = ref("http")
      const host = ref("127.0.0.1")
      const port = ref("1080")
      const ipInfo = ref("")
      const pingGithubInfo = ref("")

      const enabledProxies = ref(false)

      onMounted(() => {
        getMeIp()
        pingGithub()
      })

      const onSwitch = () => {
        if (!enabledProxies.value) {
          remote.getCurrentWindow().webContents.session.setProxy({})
          $q.notify({
            message: "已禁用代理",
            position: "top-right",
            timeout: 1000,
            type: 'info'
          })
          getMeIp()
        } else {
          setHttpProxy()
        }
        pingGithub()
      }

      const pingGithub = () => {
        pingGithubInfo.value = "正在 Ping Github ..."
        const  startTime = new Date().getTime()
        $axios(githubApi.ping())
          .then(_ => {
            const endTime = new Date().getTime()
            const duration = (endTime - startTime)
            pingGithubInfo.value = "与 Github 连接测试完成 " + duration + "ms"
          })
          .catch(err => {
            pingGithubInfo.value = "与 Github 连接失败，请检查网络/代理"
          })
      }

      const getMeIp = () => {
        ipInfo.value = "正在获取 IP 信息..."
        $axios(commonApi.mineIp())
          .then(res => {
            ipInfo.value = res.data
          })
          .catch(err => {
            ipInfo.value = "获取 IP 信息出错，请检查网络/代理"
          })
      }

      const setHttpProxy = () => {
        const proxyRules = `${protocol.value}://${host.value}:${port.value}`
        remote.getCurrentWindow().webContents.session.setProxy({proxyRules})

        $q.notify({
          message: "设置成功，正在更新 IP 信息",
          position: "top-right",
          timeout: 1000,
          type: 'info'
        })

        getMeIp()
      }

      const onProxyChange = debounce(() => {
        if (!protocol.value || !host.value || !port.value) {
          return
        }

        setHttpProxy()
      }, 1000)

      watch(protocol, () => {
        onProxyChange()
      }, {lazy: true})

      watch(host, () => {
        onProxyChange()
      }, {lazy: true})

      watch(port, () => {
        onProxyChange()
      }, {lazy: true})

      return {
        onSwitch,
        pingGithub,
        pingGithubInfo,
        getMeIp,
        enabledProxies,
        ipInfo,
        setHttpProxy,
        protocol,
        host,
        port,
        PROTOCOLS
      }
    }
  })
</script>
