import {store} from 'quasar/wrappers';
import ElectronStore from "electron-store";
import Vuex from 'vuex';
import {commonApi} from "src/api";
import {ipcRenderer} from "electron";
import {isValidURL} from "src/common";

export enum SignalType {
  Initialize,
  IsBad,
  IsGood
}

export type VuexState = {
  files: string[],
  user: string,
  repo: string,
  path: string,
  language: string,
  pingGithubUrl: string,
  pingIpUrl: string,
  proxyEnabled: boolean,
  proxy: string,

  signalType: SignalType
}

const schema = {
  files: {
    type: 'array',
    default: []
  },
  user: {
    type: 'string',
    default: ""
  },
  repo: {
    type: 'string',
    default: ""
  },
  path: {
    type: 'string',
    default: ""
  },
  language: {
    type: 'string',
    default: 'zh-ch'
  },
  pingGithubUrl: {
    type: 'string',
    default: 'https://github.com/git-guides'
  },
  pingIpUrl: {
    type: 'string',
    default: 'http://myip.ipip.net'
  },
  proxyEnabled: {
    type: 'boolean',
    default: false,
  },
  proxy: {
    type: 'string',
    format: "uri",
    default: 'http://127.0.0.1:1086'
  }
}

const eStore = new ElectronStore<VuexState>({
  // @ts-ignore
  schema: schema
})

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default store(function ({Vue}) {
  Vue.use(Vuex);

  const proxyEnabled = eStore.get('proxyEnabled')
  const proxy = eStore.get('proxy')

  const store = new Vuex.Store<VuexState>({
    state: {
      files: eStore.get('files'),
      user: eStore.get('user'),
      repo: eStore.get('repo'),
      path: eStore.get('path'),
      language: eStore.get('language'),
      pingGithubUrl: eStore.get('pingGithubUrl'),
      pingIpUrl: eStore.get('pingIpUrl'),
      proxyEnabled: isValidURL(proxy) && proxyEnabled,
      proxy: proxy,

      signalType: SignalType.Initialize
    },

    mutations: {
      addFile(state, filePath: string) {
        state.files.push(filePath)
      },
      setSignalType(state, newType: SignalType) {
        state.signalType = newType
      },
      setProxyEnabled(state, status: boolean) {
        if (status && isValidURL(state.proxy)) {
          ipcRenderer.send("set-proxies", state.proxy)
        } else {
          ipcRenderer.send("close-proxies")
        }

        eStore.set("proxyEnabled", status)
        state.proxyEnabled = status
      },
      setProxy(state, url: string) {
        eStore.set("proxy", url)
        state.proxy = url
      },
    },

    strict: !!process.env.DEV
  });

  if (proxyEnabled && isValidURL(proxy)) {
    ipcRenderer.send("set-proxies", proxy)
  } else {
    ipcRenderer.send("close-proxies")
  }

  commonApi.pingGithub()
    .catch(() => {
      store.commit("setSignalType", SignalType.IsBad)
    })

  return store;
});
