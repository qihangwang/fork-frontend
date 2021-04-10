import EXPLORER_CONTRACT from './contracts';

const networkId = process.env.VUE_APP_NETWORK_ID;

/* project info */
const FarmProject = {
  '0': {
    name: 'Fork Finance',
    icon: 'https://i.loli.net/2021/04/01/WEcd5aKH2fT1whR.png',
    links: {
      website: 'https://fork-finance.org',
      twitter: 'https://twitter.com/ForkFinance',
      telegram: 'https://t.me/forkfinance',
      medium: 'https://fork-finance.medium.com/',
      github: 'https://github.com/fork-finance',
    },
    coin: 'FORK',
    desc: 'A defi factory on Binance Smart Chain that produces defi-project in a yield farming way',
    start: '2020-04-01',
    end: '2020-04-30',
    pools: {
      '0': {
        name: 'FORK-BNB-LP',
        icon: 'https://i.loli.net/2021/04/10/cv258anKxRmDLlE.png',
        token: {
          name: 'FORK',
          address: EXPLORER_CONTRACT[networkId]['FORK'],
        },
        quoteToken: {
          name: 'WBNB',
          address: EXPLORER_CONTRACT[networkId]['WBNB'],
        },
      },
      // '1': {
      //   name: 'FORK-BUSD-LP',
      //   icon: 'https://i.loli.net/2021/04/10/xovDZaibX1547Bn.png',
      //   token: {
      //     name: 'FORK',
      //     address: EXPLORER_CONTRACT[networkId]['FORK'],
      //   },
      //   quoteToken: {
      //     name: 'BUSD',
      //     address: EXPLORER_CONTRACT[networkId]['BUSD'],
      //   },
      // },
      '2': {
        name: 'FORK',
        icon: 'https://fork-finance.org/ico_lg_1_64@2x.png',
        quoteToken: {
          name: 'FORK',
          address: EXPLORER_CONTRACT[networkId]['FORK'],
        },
      },
      '3': {
        name: 'CHECK-WBNB-LP',
        icon: 'https://i.loli.net/2021/04/10/xgN4RvmatbAVGWB.png',
        token: {
          name: 'CHECK',
          address: EXPLORER_CONTRACT[networkId]['CHECK'],
        },
        quoteToken: {
          name: 'WBNB',
          address: EXPLORER_CONTRACT[networkId]['WBNB'],
        },
      },
      // '4': {
      //   name: 'CHECK-BUSD-LP',
      //   icon: 'https://i.loli.net/2021/04/10/RTjklcBEOyVPfGW.png',
      //   token: {
      //     name: 'CHECK',
      //     address: EXPLORER_CONTRACT[networkId]['CHECK'],
      //   },
      //   quoteToken: {
      //     name: 'WBNB',
      //     address: EXPLORER_CONTRACT[networkId]['WBNB'],
      //   },
      // },
      '5': {
        name: 'CHECK',
        icon: 'https://i.loli.net/2021/04/10/ZSrR1nNk7ygKhU9.png',
        quoteToken: {
          name: 'CHECK',
          address: EXPLORER_CONTRACT[networkId]['CHECK'],
        },
      },
    },
  },
};

export default FarmProject;
