import IERC20JSON from '../contract/IERC20.json';
import WBNBJSON from '../contract/MockWBNB.json';
import BUSDJSON from '../contract/MockDai.json';
import ForkTokenJSON from '../contract/ForkToken.json';
import IFairLaunchJSON from '../contract/IFairLaunch.json';
import ForkFarmJSON from '../contract/ForkFarm.json';

const EXPLORER_CONTRACT = {
  56: {
    URLS: 'https://bscscan.com',
    FORK: '0xa9044F45039B798D21E02CB77F396A2d387cACdD',
    CHECK: '',
    MOON: '',
    IFairLaunch: '',
    ForkFarm: '',
    WBNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
  },
  97: {
    URLS: 'https://testnet.bscscan.com',
    FORK: '0xa3fd694c5cB6233beE7aCad94Cb11C57F157324A',
    CHECK: '0xA951C3411B7b0B3F7d4BEB46BEa03694966aB7ed',
    MOON: '0x0b9201E260FF82cb7e7A84215c281BFFba1B8857',
    IFairLaunch: '0xc532450D578a907F541A45E6908ebbeb811fA99b',
    ForkFarm: '0x69685FB51c612fa32c5B8faBcDbEbf48a8b8b011',
    WBNB: "0x81D71b7e8366A5E3dbf4E9AD431997cEbe9088D8",
    BUSD: "0x97CD44c56Cd8CF914B32eDfc2A7FdC537f20C21e"
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
    address: EXPLORER_CONTRACT[networkId] ? EXPLORER_CONTRACT[networkId]['BNB'] : '',
    abi: WBNBJSON,
    name: 'BNB',
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
  Fork: {
    abi: ForkTokenJSON,
    address: EXPLORER_CONTRACT[networkId] ? EXPLORER_CONTRACT[networkId]['FORK'] : '',
    name: 'Fork',
  },
  Check: {
    abi: IERC20JSON,
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
  }
};
