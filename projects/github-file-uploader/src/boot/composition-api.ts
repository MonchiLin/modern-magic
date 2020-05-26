import VueCompositionApi from '@vue/composition-api';
import {boot} from 'quasar/wrappers';
import TrayService from 'src/tray.service';

declare module 'vue/types/vue' {
  interface Vue {
    $tray: TrayService;
  }
}

export default boot(({Vue}) => {
  Vue.use(VueCompositionApi)
  Vue.prototype.$tray = new TrayService()
});
