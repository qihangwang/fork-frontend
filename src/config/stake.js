import EXPLORER_CONTRACT from './contracts';

const networkId = process.env.VUE_APP_NETWORK_ID;

/* project info */
const StakePools = {
  '97': [
    {
      title: 'Stake FORK-BNB LP token to earn FORK rewards',
      name: 'FORK-BNB LP',
      imgs: [
        'https://fork-finance.org/ico_lg_1_64@2x.png',
        'https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png',
      ],
      token: {
        name: 'FORK',
        address: EXPLORER_CONTRACT[networkId]['FORK'],
      },
      quoteToken: {
        name: 'WBNB',
        address: EXPLORER_CONTRACT[networkId]['WBNB'],
      },
    },
    {
      title: 'Stake FORK-BUSD LP token to earn FORK rewards',
      name: 'FORK-BUSD LP',
      imgs: [
        'https://fork-finance.org/ico_lg_1_64@2x.png',
        'https://exchange.pancakeswap.finance/images/coins/0xe9e7cea3dedca5984780bafc599bd69add087d56.png',
      ],
      token: {
        name: 'FORK',
        address: EXPLORER_CONTRACT[networkId]['FORK'],
      },
      quoteToken: {
        name: 'BUSD',
        address: EXPLORER_CONTRACT[networkId]['BUSD'],
      },
    },
    {
      title: 'Stake FORK token to earn FORK rewards',
      name: 'FORK',
      imgs: ['https://fork-finance.org/ico_lg_1_64@2x.png'],
      quoteToken: {
        name: 'FORK',
        address: EXPLORER_CONTRACT[networkId]['FORK'],
      },
    },
  ],
  '56': [
    {
      title: 'Stake FORK-BNB LP token to earn FORK rewards',
      name: 'FORK-BNB LP',
      imgs: [
        'https://fork-finance.org/ico_lg_1_64@2x.png',
        'https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png',
      ],
      token: {
        name: 'FORK',
        address: EXPLORER_CONTRACT[networkId]['FORK'],
      },
      quoteToken: {
        name: 'WBNB',
        address: EXPLORER_CONTRACT[networkId]['WBNB'],
      },
    },
    {
      title: 'Stake FORK token to earn FORK rewards',
      name: 'FORK',
      imgs: ['https://fork-finance.org/ico_lg_1_64@2x.png'],
      quoteToken: {
        name: 'FORK',
        address: EXPLORER_CONTRACT[networkId]['FORK'],
      },
    },
  ],
};

export default StakePools;
