import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loaded: false,
    chainId: '', // 节点
    NetErrorBtn: false, //
    account: '', //当前用户
    accountLoad: '',
    wallet: '', //当前使用的钱包
    fromPage: location.pathname,
    toPage: location.pathname,
    routeLoading: false, //全局loading
  },
  mutations: {
    setAccount(state, str) {
      state.account = str;
    },
    setLoad(state, boolen) {
      state.loaded = boolen;
    },
    setWallet(state, str) {
      state.wallet = str;
    },
    setAttr(state, obj) {
      state[obj.key] = obj.val;
    },
    changeFromPage(state, page) {
      state.fromPage = page.path;
    },
    changeToPage(state, page) {
      state.toPage = page.path;
    },
    setAccountLoad(state) {
      state.accountLoad = true;
    },
    setNetError(state, boolen) {
      state.NetErrorBtn = boolen;
    },
    setLoadingState(state, val) {
      state.routeLoading = val;
    },
  },
  actions: {
    changeLanguage({ commit }, lang) {
      commit('setLanguage', lang);
    },
    changeAccount({ commit }, str) {
      commit('setAccount', str);
    },
    changeLoaded({ commit }, boolen) {
      commit('setLoad', boolen);
    },
    changeWallet({ commit }, str) {
      commit('setWallet', str);
    },
    changeChain({ commit }, obj) {
      commit('setAttr', obj);
    },
  },
  modules: {},
});
