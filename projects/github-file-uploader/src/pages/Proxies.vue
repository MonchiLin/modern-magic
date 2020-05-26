<template>
  <div>
    <q-toggle v-model="proxyEnabled" label="代理"/>

    <div class="q-gutter-md">
      <q-select
        v-model="protocol"
        :disable="!proxyEnabled"
        label="代理协议"
        transition-show="flip-up"
        transition-hide="flip-down"
        :options="PROTOCOLS"
        style="width: 250px"
      />

      <q-input
        v-model="hostname"
        :disable="!proxyEnabled"
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
        :disable="!proxyEnabled"
        clearable
        clear-icon="close"
        filled
        color="purple-12"
        label="端口"
      />

      <q-btn glossy label="Ping" no-caps @click="test"/>

      <p>{{pingGithubInfo}}</p>
      <div>
        <span class="text-subtitle1 text-weight-regular">{{ipInfo}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, onMounted, ref, watch, computed, watchEffect} from '@vue/composition-api'
  import {debounce} from 'quasar'
  import {remote} from "electron";
  import {commonApi} from "src/api";

  const PROTOCOLS = ["http:", "https:"]

  export default defineComponent({
    setup(props, context) {
      const {$q, $store} = context.root
      const proxyURL = new URL($store.state.proxy)
      const protocol = ref(proxyURL.protocol)
      const hostname = ref(proxyURL.hostname)
      const port = ref(proxyURL.port)
      const ipInfo = ref("")
      const pingGithubInfo = ref("")

      const proxyEnabled = computed({
        get: () => $store.state.proxyEnabled,
        set: val => {
          $store.commit('setProxyEnabled', val)
        }
      })

      const proxyString = computed(() => {
        return `${protocol.value}//${hostname.value}:${port.value}`
      })

      onMounted(() => {
        callPing()
        callPingIP()
      })

      const callPing = () => {
        pingGithubInfo.value = "正在 Ping Github ..."
        const startTime = new Date().getTime()
        commonApi.pingGithub()
          .then(_ => {
            const endTime = new Date().getTime()
            const duration = (endTime - startTime)
            pingGithubInfo.value = "与 Github 连接测试完成 " + duration + "ms"
          })
          .catch(_ => {
            pingGithubInfo.value = "与 Github 连接失败，请检查网络/代理"
          })
      }

      const callPingIP = () => {
        ipInfo.value = "正在获取 IP 信息..."
        commonApi.pingIP()
          .then(res => {
            ipInfo.value = res
          })
          .catch(err => {
            ipInfo.value = "获取 IP 信息出错，请检查网络/代理"
          })
      }

      const setHttpProxy = () => {
        $store.commit('setProxy', proxyString.value)
        remote.getCurrentWindow().webContents.session.setProxy({proxyRules: proxyString.value})

        $q.notify({
          message: "设置成功，正在更新 IP 信息",
          position: "top-right",
          timeout: 1000,
          type: 'info'
        })

        callPingIP()
      }

      const test = () => {
        callPing()
        callPingIP()
      }

      const onProxyChange = debounce(() => {
        if (!protocol.value || !hostname.value || !port.value) {
          return
        }

        setHttpProxy()
      }, 1000)

      watch(protocol, () => {
        onProxyChange()
      }, {lazy: true})

      watch(hostname, () => {
        onProxyChange()
      }, {lazy: true})

      watch(port, () => {
        onProxyChange()
      }, {lazy: true})


      watch(proxyEnabled, (val) => {
        if (proxyEnabled.value) {
          setHttpProxy()
        } else {
          $q.notify({
            message: "已禁用代理",
            position: "top-right",
            timeout: 1000,
            type: 'info'
          })
        }
        callPingIP()
        callPing()
      })


      return {
        test,
        callPing,
        pingGithubInfo,
        proxyEnabled,
        ipInfo,
        setHttpProxy,
        protocol,
        hostname,
        port,
        PROTOCOLS
      }
    }
  })
</script>
