import VueCompositionApi from '@vue/composition-api';
import {boot} from 'quasar/wrappers';
import TrayService from 'src/tray.service';
import VueFileAgent from 'vue-file-agent';
import 'vue-file-agent/dist/vue-file-agent.css';

declare module 'vue/types/vue' {
  interface Vue {
    $tray: TrayService;
  }
}

export default boot(({Vue}) => {
  Vue.use(VueCompositionApi)
  Vue.use(VueFileAgent)
  Vue.prototype.$tray = new TrayService()
});
