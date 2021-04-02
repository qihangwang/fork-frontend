/*
 * @Author: **
 * @Description: global plugin
 */
const vuePlugin = {};
vuePlugin.install = function(Vue) {
  Vue.mixin({
    computed: {
      chainIdError() {
        return this.$store.state.chainId != process.env.VUE_APP_NETWORK_ID;
      },
    },
  });
};

export default vuePlugin;
