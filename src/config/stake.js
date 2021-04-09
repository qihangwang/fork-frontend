import EXPLORER_CONTRACT from './contracts';

const networkId = process.env.VUE_APP_NETWORK_ID;

/* project info */
const StakePools = [
  {
    title: 'Stake FORK-WBNB LP token to earn FORK rewards',
    name: 'FORK-WBNB LP',
    imgs: ['https://img.bee-cdn.com/large/3b9ae203lz1gonu6yvykvj20e80e8tbi.jpg'],
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
      'https://img.bee-cdn.com/large/3b9ae203lz1gonu6yvykvj20e80e8tbi.jpg',
      'https://img.bee-cdn.com/large/3b9ae203lz1gonu6yvykvj20e80e8tbi.jpg',
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
    title: 'Stake Fork-WBNB LP token to earn FORK rewards',
    name: 'Fork LP',
    imgs: ['https://img.bee-cdn.com/large/3b9ae203lz1gonu6yvykvj20e80e8tbi.jpg'],
    quoteToken: {
      name: 'FORK',
      address: EXPLORER_CONTRACT[networkId]['FORK'],
    },
  },
];

export default StakePools;
