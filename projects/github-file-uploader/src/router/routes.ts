import {RouteConfig} from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', name: 'Main', component: () => import('pages/Main.vue')},
      {path: 'Guide', name: 'Guide', component: () => import('pages/Guide.vue')},
      {path: 'Preference', name: 'Preference', component: () => import('pages/Preference.vue')},
      {path: 'Proxies', name: 'Proxies', component: () => import('pages/Proxies.vue')},
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
