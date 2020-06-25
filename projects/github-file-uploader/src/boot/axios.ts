import axios, {AxiosInstance} from 'axios';
import {boot} from 'quasar/wrappers';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default boot(({Vue}) => {
  const request = axios.create({
    adapter: require('axios/lib/adapters/http')
  })


  Vue.prototype.$axios = request;
});
