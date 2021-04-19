import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/stake',
    name: 'Stake',
    component: () => import('../views/Stake.vue'),
  },
  {
    path: '/farm',
    name: 'Farm',
    component: () => import('../views/Farm.vue'),
  },
  {
    path: '/cash',
    name: 'Cash',
    component: () => import('../views/Cash.vue'),
  },
  {
    path: '*',
    redirect: { name: 'Stake' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_ROUTE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  store.commit('changeFromPage', from);
  store.commit('changeToPage', to);
  next();
});

export default router;
