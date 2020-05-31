<template>
  <q-layout view="lHh Lpr lff" container class="shadow-2 rounded-borders">
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="100"
      :breakpoint="400"
      :mini="true"
      content-style="border-right: 1px solid #ddd"
    >

      <div class="flex justify-center items-center" style="height: 56px;">
        <q-avatar @click="$router.push({name:'Preference'})" size="32px">
          <img :src="require('assets/boy-avatar.png')">
        </q-avatar>
      </div>

      <q-scroll-area style="height: 100%;">
        <q-list padding>

          <q-item v-for="item of menuList"
                  :key="item.label"
                  :title="item.label"
                  v-ripple
                  clickable
                  :active="active === item.routeName"
                  @click="onClickItem(item)"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon"/>
            </q-item-section>

            <q-item-section>
              {{item.label}}
            </q-item-section>
          </q-item>

          <q-separator/>

          <q-item @click="handleExit" v-ripple clickable>
            <q-item-section avatar>
              <q-icon :name="ionExitOutline"/>
            </q-item-section>

            <q-item-section>退出</q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>

    </q-drawer>

    <q-page-container>
      <q-page padding>
        <q-banner v-show="showNetError" dark inline-actions class="text-white bg-red">
          检测到与 GitHub 网络不通畅，是否设置代理？
          <template v-slot:action>
            <q-btn glossy color="deep-orange" label="设置代理" @click="toSetProxy"/>
            <q-btn flat label="关闭"/>
          </template>
        </q-banner>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
  import {computed, defineComponent, ref} from '@vue/composition-api'
  import {remote} from 'electron'
  import {SignalType} from "src/store";
  import {
    ionCloudUploadOutline,
    ionListOutline,
    ionSettingsOutline,
    ionGlobeOutline,
    ionHelpCircleOutline,
    ionExitOutline
  } from '@quasar/extras/ionicons-v5'

  const MenuList = [
    {
      icon: ionCloudUploadOutline,
      label: '上传',
      routeName: "Main"
    },
    // {
    //   icon: ionListOutline,
    //   label: '上传记录',
    //   routeName: "Record"
    // },
    {
      icon: ionGlobeOutline,
      label: '代理',
      routeName: "Proxies"
    }, {
      icon: ionHelpCircleOutline,
      iconColor: 'primary',
      label: '教程',
      routeName: "Guide"
    }
  ]

  export default defineComponent({
    setup(props, context) {
      const drawer = ref(false)
      const miniState = ref(true)
      const {$router, $route, $axios, $store} = context.root
      const netError = ref(false)
      const menuList = ref(MenuList)

      const showNetError = computed(() => {
        return $store.state.signalType === SignalType.IsBad && $route.name !== "Proxies"
      })

      const active = computed(() => {
        return $route.name
      })

      const onClickItem = (item) => {
        $router.push({name: item.routeName})
      }

      const toSetProxy = () => {
        $store.commit('setSignalType', SignalType.Initialize)
        $router.push({name: "Proxies"})
      }

      const handleExit = () => {
        remote.app.exit()
      }

      return {
        menuList,
        drawer,
        miniState,
        active,
        onClickItem,
        showNetError,
        toSetProxy,
        handleExit,
        ionExitOutline
      }
    }
  })
</script>
