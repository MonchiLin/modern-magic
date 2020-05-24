import axios, {AxiosInstance} from 'axios';
import {boot} from 'quasar/wrappers';
import { AccessToken } from 'src/config';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default boot(({Vue}) => {
  const request = axios.create({
    headers: {
      Authorization: `token ${AccessToken}`
    },
    adapter: require("axios/lib/adapters/http")
  })


  Vue.prototype.$axios = request;
});
