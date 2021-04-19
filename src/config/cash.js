import EXPLORER_CONTRACT from './contracts';

const networkId = process.env.VUE_APP_NETWORK_ID;

/* project info */
const CashProject = {
  '97': {
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
        '1': {
          name: 'FORK',
          icon: 'https://fork-finance.org/ico_lg_1_64@2x.png',
          quoteToken: {
            name: 'FORK',
            address: EXPLORER_CONTRACT[networkId]['FORK'],
          },
        },
        '2': {
          name: 'CHECK-BNB-LP',
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
        '3': {
          name: 'CHECK',
          icon: 'https://i.loli.net/2021/04/10/ZSrR1nNk7ygKhU9.png',
          quoteToken: {
            name: 'CHECK',
            address: EXPLORER_CONTRACT[networkId]['CHECK'],
          },
        },
        '4': {
          name: 'BUSD',
          icon: 'https://exchange.pancakeswap.finance/images/coins/0xe9e7cea3dedca5984780bafc599bd69add087d56.png',
          quoteToken: {
            name: 'BUSD',
            address: EXPLORER_CONTRACT[networkId]['BUSD'],
          },
        },
      },
    },
  },
  '56': {
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
        '1': {
          name: 'FORK',
          icon: 'https://fork-finance.org/ico_lg_1_64@2x.png',
          quoteToken: {
            name: 'FORK',
            address: EXPLORER_CONTRACT[networkId]['FORK'],
          },
        },
        '2': {
          name: 'CHECK-BNB-LP',
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
        '3': {
          name: 'CHECK',
          icon: 'https://i.loli.net/2021/04/10/ZSrR1nNk7ygKhU9.png',
          quoteToken: {
            name: 'CHECK',
            address: EXPLORER_CONTRACT[networkId]['CHECK'],
          },
        },
        '4': {
          name: 'BUSD',
          icon: 'https://exchange.pancakeswap.finance/images/coins/0xe9e7cea3dedca5984780bafc599bd69add087d56.png',
          quoteToken: {
            name: 'BUSD',
            address: EXPLORER_CONTRACT[networkId]['BUSD'],
          },
        },
      },
    },
  },
};

export default CashProject;