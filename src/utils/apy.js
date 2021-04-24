import BigNumber from 'bignumber.js/bignumber';
import Contract from './contract';
import contracts from '@/config/contractObj';

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export const BSC_BLOCK_TIME = 3;
export const CAKE_PER_BLOCK = new BigNumber(20);
export const FORK_PER_BLOCK = new BigNumber(2);

export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365); // 10512000
export const TOKEN_PER_BLOCK = 5;

/**
 * Get the APY value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @returns Null if the APY is NaN or infinite.
 */
export const getPoolApys = (stakingTokenPrice, rewardTokenPrice, totalStaked) => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(TOKEN_PER_BLOCK).times(BLOCKS_PER_YEAR);
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked);
  const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100);
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber();
};

export const getPriceBusd = async type => {
  const ZERO = new BigNumber(0);
  const COUNT = new BigNumber(10).pow(18);
  const current = contracts.UniswapV2Router;
  let target;
  if (type == 'BNB') {
    target = contracts['WBNB'];
  } else {
    target = contracts[type];
  }
  const WBNB = contracts.WBNB;
  const BUSD = contracts.BUSD;
  const contract = new Contract(current.abi, current.address, current.name);
  if (target.address == BUSD.address) {
    return 1;
  }
  const arr = Array.from(new Set([target.address, WBNB.address, BUSD.address]));
  const res = await contract.call('getAmountsOut', [COUNT, arr]);
  if (res) {
    return new BigNumber(res[res.length - 1]).div(new BigNumber(10).pow(18));
  }
  return ZERO;
};

/**
 * Get farm APY value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param poolLiquidityUsdt Total pool liquidity in USD
 * @returns
 */

export const getFarmApy = async (poolWeight, poolLiquidityUsdt, multiple) => {
  if (poolLiquidityUsdt.toString() == '0') poolLiquidityUsdt = new BigNumber('0.01');
  const cakePriceUsd = await getPriceBusd('CHECK');
  const yearlyCakeRewardAllocation = CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR).times(poolWeight);
  const apy = yearlyCakeRewardAllocation
    .times(cakePriceUsd)
    .times(multiple)
    .div(poolLiquidityUsdt)
    .times(100);
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber();
};

export const getPoolApy = async (poolWeight, poolLiquidityUsdt, multiple) => {
  if (poolLiquidityUsdt.toString() == '0') poolLiquidityUsdt = new BigNumber('0.01');
  const cakePriceUsd = await getPriceBusd('FORK');
  const yearlyCakeRewardAllocation = FORK_PER_BLOCK.times(BLOCKS_PER_YEAR).times(poolWeight);
  const apy = yearlyCakeRewardAllocation
    .times(cakePriceUsd)
    .times(multiple)
    .div(poolLiquidityUsdt)
    .times(100);
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber();
};
