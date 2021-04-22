import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import initWeb3 from '@/utils/web3';

Vue.use(VueRouter);

const routes = [
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
    path: '/countdown',
    name: 'Countdown',
    component: () => import('../views/CountDown.vue'),
  },
  {
    path: '*',
    redirect: { name: 'Farm' },
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

const getCurrentTime = async () => {
  let time = await web3js.eth.getBlock('latest');
  return time.timestamp;
};

router.beforeEach(async (to, from, next) => {
  window.scrollTo(0, 0);
  document.body.scrollTop = 0;

  document.documentElement.scrollTop = 0;
  store.commit('changeFromPage', from);
  store.commit('changeToPage', to);

  if (!window.web3js) {
    initWeb3().then(async () => {
      const currentTime = await getCurrentTime();
      const endTime = new Date('2021-04-19T12:00:00.000+0000');
      console.log(currentTime, endTime)
      if (to.name !== 'Countdown' && endTime - currentTime * 1000 > 0) {
        next('/countdown');
      } else {
        next();
      }
    });
  } else {
    const currentTime = await getCurrentTime();
    const endTime = new Date('2021-04-19T12:00:00.000+0000');
    if (to.name !== 'Countdown' && endTime - currentTime * 1000 > 0) {
      next('/countdown');
    } else {
      next();
    }
  }
});

export default router;
