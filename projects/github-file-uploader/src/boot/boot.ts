import {boot} from 'quasar/wrappers';
import TrayService from 'src/tray.service';
import { vFoxus } from 'src/foxus';

declare module 'vue/types/vue' {
  interface Vue {
    $tray: TrayService;
  }
}

export default boot(({Vue}) => {
  Vue.directive('foxus', vFoxus)
  Vue.prototype.$tray = new TrayService()
});
