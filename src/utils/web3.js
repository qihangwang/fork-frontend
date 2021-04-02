// import Web3 from 'web3';
const Web3 = require('web3');
import store from '../store/index';
// import detectEthereumProvider from '@metamask/detect-provider';

async function init() {
  // const provider = await detectEthereumProvider();
  if (window.web3) {
    //Metamask 把它的 web3 提供者注入到浏览器的全局 JavaScript对象web3中
    // Metamask 默认使用 Infura 的服务器做为 web3 提供者
    window.web3js = new Web3(window.web3.currentProvider);
    window.web3js.extend({
      methods: [
        {
          name: 'getVersion',
          call: 'eth_callForFun',
        },
      ],
    });
    console.log('installed Metamask');
    store.dispatch('changeLoaded', true);
    // startApp(provider); // Initialize your app
  } else {
    store.state.enthume = false;
    window.web3js = new Web3(new Web3.providers.HttpProvider(process.env.VUE_APP_NETWORK_RPC_URL));
    console.log('Please install MetaMask!');
    store.dispatch('changeLoaded', true);
  }
}

export default init;
