import {store} from 'quasar/wrappers';
import ElectronStore from "electron-store";
import {remote} from 'electron'
import Vuex from 'vuex';

const {app} = remote

// const SchemaA = {
//   [name keyof string]: JSONSchema
// }

type VuexState = {
  files: string[],
  user: string,
  repo: string,
  path: string,
  language: string,
  proxyEnabled: boolean,
  proxy: string,
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
  proxyEnabled: {
    type: 'boolean',
    default: false,
  },
  proxy: {
    type: 'string',
    default: 'http://127.0.0.1:8080'
  }
}

const electronStore = new ElectronStore<VuexState>({
  schema
})

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default store(function ({Vue}) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<VuexState>({
    state: {
      files: electronStore.get('files'),
      user: electronStore.get('user'),
      repo: electronStore.get('repo'),
      path: electronStore.get('path'),
      language: electronStore.get('language'),
      proxyEnabled: electronStore.get('proxyEnabled'),
      proxy: electronStore.get('proxy'),
    },

    mutations: {
      addFile(filePath) {
        const file = {}
        if (filePath) {

        }


      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEV
  });

  return Store;
});
