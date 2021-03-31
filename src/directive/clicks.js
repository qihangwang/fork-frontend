import Vue from 'vue';
import store from '../store';

Vue.directive('click1', {
  inserted: function(el, binding, vnode) {
    let cb_name = binding.expression,
      cb = vnode.context[cb_name];

    el.addEventListener('click', async () => {
      if (store.state.account == '') {
        alert('请先登录钱包');
      } else {
        cb();
      }
    });
  },
  unbind: function(el) {
    el.removeEventListener('click', () => {});
  },
});
