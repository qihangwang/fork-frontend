import IERC20JSON from '../contract/IERC20.json';
import WBNBJSON from '../contract/MockWBNB.json';
import BUSDJSON from '../contract/MockDai.json';
import iBNBJSON from '../contract/iBNB.json';
import iBUSDJSON from '../contract/iBUSD.json';
import ForkTokenJSON from '../contract/ForkToken.json';
import IFairLaunchJSON from '../contract/IFairLaunch.json';

const EXPLORER_CONTRACT = {
  56: {
    URLS: 'https://bscscan.com',
    FORK: '0x3C949Faa8Bd48371d42F25435D5777875D76dCD2',
    MOON: '0x625D92a51B9C18bA76912fc7dE7456Dea5ee1E84',
  },
  97: {
    URLS: 'https://testnet.bscscan.com',
    FORK: '0x3C949Faa8Bd48371d42F25435D5777875D76dCD2',
    MOON: '0x625D92a51B9C18bA76912fc7dE7456Dea5ee1E84',
  },
};

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
  BNB: {
    address: '0x744FB5700D556Ec736Bc2924A2656196039937f1',
    abi: WBNBJSON,
    name: 'BNB',
  },
  BUSD: {
    address: '0x69225118990113804d0F2738f1fDDCe97163B3f5',
    abi: BUSDJSON,
    name: 'BUSD',
  },
  iBNB: {
    address: '0x087d5C13a12EcE97f1D7dB34278a015aBd706868',
    abi: iBNBJSON,
    name: 'iBNB',
  },
  iBUSD: {
    address: '0x0eCf125E54705B4D4840D1c1D192db1C0cfa3339',
    abi: iBUSDJSON,
    name: 'iBUSD',
  },
  ERC20: {
    address: '0x625D92a51B9C18bA76912fc7dE7456Dea5ee1E84',
    abi: IERC20JSON,
    name: 'ERC',
  },
  Fork: {
    abi: ForkTokenJSON,
    address: EXPLORER_CONTRACT[networkId] ? EXPLORER_CONTRACT[networkId]['FORK'] : '',
    name: 'Fork',
  },
  IFairLaunch: {
    address: '0xaD2B3F2EDe7f961a064D437d4a487A4B8e617B3C',
    abi: IFairLaunchJSON,
    name: 'IFairLaunch',
  },
};
