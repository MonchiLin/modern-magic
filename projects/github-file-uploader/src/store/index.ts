import {store} from 'quasar/wrappers';
import ElectronStore from "electron-store";
import Vuex from 'vuex';
import {commonApi} from "src/api";
import {ipcRenderer} from "electron";
import {FileRecord, isValidURL} from "src/common";

export enum SignalType {
  Initialize,
  IsBad,
  IsGood
}

export type VuexState = {
  fileRecords: FileRecord[],
  user: string,
  repo: string,
  path: string,
  commitMessage: string,
  language: string,
  pingGithubUrl: string,
  pingIpUrl: string,
  proxyEnabled: boolean,
  proxy: string,

  signalType: SignalType
}

const schema = {
  fileRecords: {
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
  commitMessage: {
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
      fileRecords: eStore.get('fileRecords'),
      user: eStore.get('user'),
      repo: eStore.get('repo'),
      path: eStore.get('path'),
      commitMessage: eStore.get('commitMessage'),
      language: eStore.get('language'),
      pingGithubUrl: eStore.get('pingGithubUrl'),
      pingIpUrl: eStore.get('pingIpUrl'),
      proxyEnabled: isValidURL(proxy) && proxyEnabled,
      proxy: proxy,

      signalType: SignalType.Initialize
    },

    mutations: {
      setSignalType(state, newType: SignalType) {
        state.signalType = newType
      },
      addFile(state, record: FileRecord) {
        state.fileRecords.push(record)
        eStore.set('fileRecords', state.fileRecords)
      },
      setFileRecords(state, records: FileRecord[]) {
        state.fileRecords = records
        eStore.set('fileRecords', state.fileRecords)
      },
      updateFileRecord(state, {index, record}) {
        state.fileRecords = [
          ...state.fileRecords.slice(0, index),
          record,
          ...state.fileRecords.slice(index + 1,)
        ]
        eStore.set('fileRecords', state.fileRecords)
      },
      setProxyEnabled(state, status: boolean) {
        if (status && isValidURL(state.proxy)) {
          ipcRenderer.send("set-proxies", state.proxy)
        } else {
          ipcRenderer.send("close-proxies")
        }
        state.proxyEnabled = status
        eStore.set("proxyEnabled", status)
      },
      setProxy(state, url: string) {
        state.proxy = url
        eStore.set("proxy", url)
      },
      setUser(state, value: string) {
        state.user = value
        eStore.set("user", value)
      },
      setRepo(state, value: string) {
        state.repo = value
        eStore.set("repo", value)
      },
      setCommitMessage(state, value: string) {
        state.commitMessage = value
        eStore.set("commitMessage", value)
      }
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
