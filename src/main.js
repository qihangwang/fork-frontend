import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/display.css';
import vuePlugin from './utils/vuePlugin';
import './App.less';
import './directive';
import { Skeleton, CountDown } from 'vant';

Vue.use(Skeleton);
Vue.use(CountDown);
Vue.use(ElementUI);
Vue.use(vuePlugin);

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
