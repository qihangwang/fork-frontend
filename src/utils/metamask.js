import detectEthereumProvider from '@metamask/detect-provider';
import store from '../store/index';

// this returns the provider, or null if it wasn't detected
async function checkProvider() {
  const provider = await detectEthereumProvider();
  if (provider) {
    startApp(provider); // Initialize your app
  } else {
    console.log('Please install MetaMask!');
  }
}

function startApp(provider) {
  // If the provider returned by detectEthereumProvider is not the same as
  // window.ethereum, something is overwriting it, perhaps another wallet.
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');
  }
  // Access the decentralized web!
}

/**********************************************************/
/* Handle chain (network) and chainChanged (per EIP-1193) */
/**********************************************************/
// async function checkChain() {
//   const chainId = await window.ethereum.request({ method: "eth_chainId" });
//   handleChainChanged(chainId);
// }

if (window.ethereum) {
  window.ethereum.on('chainChanged', handleChainChanged);
  window.ethereum.on('accountsChanged', handleAccountsChanged);
}
let currentAccount = null;

function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    // console.log('Please connect to MetaMask.');
    // window.location.reload();
    store.dispatch('changeAccount', '');
    store.dispatch('changeWallet', '');
  } else if (accounts[0] !== currentAccount) {
    // window.location.reload();
    store.dispatch('changeAccount', accounts[0]);
    store.dispatch('changeWallet', 'MetaMask');
    // Do any other work!
  }
}
// 节点发生改变
function handleChainChanged(_chainId) {
  const chainId = eval(_chainId).toString(10);
  if (store.state.chainId == process.env.VUE_APP_NETWORK_ID) {
    store.commit('setNetError', true);
  }
  if (chainId == process.env.VUE_APP_NETWORK_ID) {
    store.commit('setNetError', false);
  }
  store.dispatch('changeChain', { key: 'chainId', val: chainId });
  // We recommend reloading the page, unless you must do otherwise
  // window.location.reload();
}

/***********************************************************/
/* Handle user accounts and accountsChanged (per EIP-1193) */
/***********************************************************/

// 授权
export async function connect() {
  if (typeof window.ethereum === 'undefined') {
    //没安装MetaMask钱包进行弹框提示
    return false;
  } else {
    const accounts = await window.ethereum
      .request({
        method: 'eth_requestAccounts',
      })
      .catch(function(reason) {
        console.log(reason, 'reason');
        return reason;
      });
    if (Array.isArray(accounts)) {
      return accounts;
    }
  }
}

export async function requestPermissions() {
  if (typeof window.ethereum !== 'undefined') {
    const permissions = await window.ethereum
      .request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      })
      .catch(error => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log('Permissions needed to continue.');
        } else {
          console.error(error);
        }
      });
    const accountsPermission = permissions.find(permission => permission.parentCapability === 'eth_accounts');
    if (accountsPermission) {
      console.log('eth_accounts permission successfully requested!');
    }
  }
  return false;
}

export const nodes = {
  56: ['https://bsc-dataseed1.ninicoin.io'],
  97: ['https://bsc-dataseed1.ninicoin.io', 'https://bsc-dataseed1.defibit.io', 'https://bsc-dataseed.binance.org'],
};

const setupNetwork = async () => {
  const provider = window.ethereum;
  if (provider) {
    const chainId = parseInt(process.env.VUE_APP_NETWORK_ID, 10);
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Binance Smart Chain Mainnet',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'bnb',
              decimals: 18,
            },
            rpcUrls: nodes[process.env.VUE_APP_NETWORK_ID],
            blockExplorerUrls: ['https://bscscan.com/'],
          },
        ],
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined");
    return false;
  }
};

export default {
  checkProvider,
  setupNetwork,
};
