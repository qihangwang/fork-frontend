// import Web3 from 'web3';
const Web3 = require('web3');
import store from '../store/index';
import detectEthereumProvider from '@metamask/detect-provider';

async function init() {
  const provider = await detectEthereumProvider();
  if (provider) {
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
    store.dispatch('changeLoaded', true);
    store.state.enthume = false;
    console.log('Please install MetaMask!');
  }
}

export default init;
