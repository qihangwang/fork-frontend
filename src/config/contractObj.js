import IERC20JSON from '../contract/IERC20.json';
import WBNBJSON from '../contract/MockWBNB.json';
import BUSDJSON from '../contract/MockDai.json';
import ForkTokenJSON from '../contract/ForkToken.json';
import CheckTokenJSON from '../contract/CheckToken.json';
import IFairLaunchJSON from '../contract/IFairLaunch.json';
import ForkFarmJSON from '../contract/ForkFarm.json';
import UniswapV2FactoryJSON from '../contract/UniswapV2Factory.json';
import UniswapV2RouterJSON from '../contract/UniswapV2Router.json';

import EXPLORER_CONTRACT from './contracts';
const networkId = process.env.VUE_APP_NETWORK_ID;

export default {
  MOONPOOL: {
    address: EXPLORER_CONTRACT[networkId] ? EXPLORER_CONTRACT[networkId]['MOON'] : '',
  },
  UN2: {
    address: '0x625D92a51B9C18bA76912fc7dE7456Dea5ee1E84',
    abi: IERC20JSON,
    name: 'UN2',
  },
  WBNB: {
    address: EXPLORER_CONTRACT[networkId] ? EXPLORER_CONTRACT[networkId]['WBNB'] : '',
    abi: WBNBJSON,
    name: 'WBNB',
  },
  BUSD: {
    address: EXPLORER_CONTRACT[networkId] ? EXPLORER_CONTRACT[networkId]['BUSD'] : '',
    abi: BUSDJSON,
    name: 'BUSD',
  },
  ERC20: {
    address: '0x625D92a51B9C18bA76912fc7dE7456Dea5ee1E84',
    abi: IERC20JSON,
    name: 'ERC',
  },
  FORK: {
    abi: ForkTokenJSON,
    address: EXPLORER_CONTRACT[networkId] ? EXPLORER_CONTRACT[networkId]['FORK'] : '',
    name: 'Fork',
  },
  CHECK: {
    abi: CheckTokenJSON,
    address: EXPLORER_CONTRACT[networkId] ? EXPLORER_CONTRACT[networkId]['CHECK'] : '',
    name: 'Check',
  },
  IFairLaunch: {
    address: EXPLORER_CONTRACT[networkId] ? EXPLORER_CONTRACT[networkId]['IFairLaunch'] : '',
    abi: IFairLaunchJSON,
    name: 'IFairLaunch',
  },
  ForkFarm: {
    address: EXPLORER_CONTRACT[networkId] ? EXPLORER_CONTRACT[networkId]['ForkFarm'] : '',
    abi: ForkFarmJSON,
    name: 'ForkFarmJSON',
  },
  UniswapV2Factory: {
    address: EXPLORER_CONTRACT[networkId] ? EXPLORER_CONTRACT[networkId][' UniswapV2Factory'] : '',
    abi: UniswapV2FactoryJSON,
    name: 'UniswapV2Factory',
  },
  UniswapV2Router: {
    address: EXPLORER_CONTRACT[networkId] ? EXPLORER_CONTRACT[networkId]['UniswapV2Router'] : '',
    abi: UniswapV2RouterJSON,
    name: 'UniswapV2RouterJSON',
  },
};
