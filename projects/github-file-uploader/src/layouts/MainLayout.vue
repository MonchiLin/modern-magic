<template>
  <q-layout view="lHh Lpr lff" container class="shadow-2 rounded-borders">
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="400"
      :mini="miniState"
      content-style="border-right: 1px solid #ddd"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >

      <div v-show="miniState" class="flex justify-center items-center" style="height: 56px;">
        <q-avatar size="32px">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
      </div>

      <q-img v-show="!miniState"
             src="https://cdn.quasar.dev/img/material.png"
             style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </div>
      </q-img>

      <q-scroll-area style="height: 100%;">
        <q-list padding>

          <q-item v-for="item of menuList"
                  :key="item.label"
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

          <q-item v-ripple clickable>
            <q-item-section avatar>
              <q-icon name="highlight_off"/>
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
        <router-view/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
  import {computed, defineComponent, onBeforeMount, ref} from '@vue/composition-api'
  import {githubApi} from "src/api";

  const MenuList = [
    {
      icon: 'send',
      label: '上传',
      routeName: "Main"
    }, {
      icon: 'history',
      label: '上传记录',
      routeName: "Record"
    }, {
      icon: 'settings',
      label: '偏好设置',
      routeName: "Preference"
    }, {
      icon: 'perm_data_setting',
      label: '代理',
      routeName: "Proxies"
    }, {
      icon: 'help',
      iconColor: 'primary',
      label: '教程',
      routeName: "Guide"
    }
  ]

  export default defineComponent({
    setup(props, context) {
      const drawer = ref(false)
      const miniState = ref(true)
      const {$router, $route, $axios} = context.root
      const netError = ref(false)
      const menuList = ref(MenuList)

      onBeforeMount(() => {
        pingGithub()
      })

      const showNetError = computed(() => {
        return netError.value && $route.name !== "Proxies"
      })

      const active = computed(() => {
        return $route.name
      })

      const onClickItem = (item) => {
        $router.push({name: item.routeName})
      }

      const toSetProxy = () => {
        netError.value = false
        $router.push({name: "Proxies"})
      }

      const pingGithub = () => {
        $axios(githubApi.ping())
          .then(res => {
            netError.value = false
          })
          .catch(err => {
            netError.value = true
          })
      }

      return {
        menuList,
        drawer,
        miniState,
        active,
        onClickItem,
        showNetError,
        toSetProxy
      }
    }
  })
</script>
