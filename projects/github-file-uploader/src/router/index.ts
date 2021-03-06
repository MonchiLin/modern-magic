import {route} from 'quasar/wrappers';
import VueRouter from 'vue-router';
import {VuexState} from '../store';
import routes from './routes';

let vueRouter: VueRouter

export default route<VuexState>(function ({Vue}) {
  Vue.use(VueRouter);

  vueRouter = new VueRouter({
    scrollBehavior: () => ({x: 0, y: 0}),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  return vueRouter;
})

export {
  vueRouter
}
