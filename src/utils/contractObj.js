import IERC20JSON from '../contract1/IERC20.json';
import WBNBJSON from '../contract1/MockWBNB.json';
import BUSDJSON from '../contract1/MockDai.json';
import iBNBJSON from '../contract1/iBNB.json';
import iBUSDJSON from '../contract1/iBUSD.json';
import ForkTokenJSON from '../contract1/ForkToken.json';
import IFairLaunchJSON from '../contract1/IFairLaunch.json';

export default {
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
  Fork: {
    abi: ForkTokenJSON,
    address: '0x3C949Faa8Bd48371d42F25435D5777875D76dCD2',
    name: 'Fork',
  },
  IFairLaunch: {
    address: '0xaD2B3F2EDe7f961a064D437d4a487A4B8e617B3C',
    abi: IFairLaunchJSON,
    name: 'IFairLaunch',
  },
};
