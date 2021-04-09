import EXPLORER_CONTRACT from './contracts';

const networkId = process.env.VUE_APP_NETWORK_ID;

/* project info */
const FarmProject = {
  '0': {
    name: 'ALOZ',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
    links: {
      twitter: 'https://twitter.com/ForkFinance',
      telegram: 'https://twitter.com/ForkFinance',
      medium: 'https://twitter.com/ForkFinance',
    },
    coin: 'CAKE',
    desc:
      'Alpaca Finance is a leveraged yield farming product, and using leveraged products involves certain risks. Please read here to understand these risks. As a user of our protocol, you are in agreement that you are aware of these risks, and that all liability resides with you. So please don’t invest your life savings, or risk assets you can’t afford to lose. Try to be as careful with your funds as we are with our code.',
    pools: {
      '0': {
        name: 'FORK-WBNB-LP',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
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
        name: 'FORK-BUSD-LP',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
        token: {
          name: 'FORK',
          address: EXPLORER_CONTRACT[networkId]['FORK'],
        },
        quoteToken: {
          name: 'BUSD',
          address: EXPLORER_CONTRACT[networkId]['BUSD'],
        },
      },
      '2': {
        name: 'FORK-LP',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
        quoteToken: {
          name: 'FORK',
          address: EXPLORER_CONTRACT[networkId]['FORK'],
        },
      },
      '3': {
        name: 'CHECK-WBNB-LP',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
        token: {
          name: 'CHECK',
          address: EXPLORER_CONTRACT[networkId]['CHECK'],
        },
        quoteToken: {
          name: 'WBNB',
          address: EXPLORER_CONTRACT[networkId]['WBNB'],
        },
      },
      '4': {
        name: 'CHECK-BUSD-LP',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
        token: {
          name: 'CHECK',
          address: EXPLORER_CONTRACT[networkId]['CHECK'],
        },
        quoteToken: {
          name: 'WBNB',
          address: EXPLORER_CONTRACT[networkId]['WBNB'],
        },
      },
      '5': {
        name: 'CHECK-LP',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
        quoteToken: {
          name: 'CHECK',
          address: EXPLORER_CONTRACT[networkId]['CHECK'],
        }
      },
    },
  },
};

export default FarmProject;
