import BigNumber from 'bignumber.js/bignumber';
import Contract from './contract';
import contracts from '@/config/contractObj';

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export const BSC_BLOCK_TIME = 3;
export const CAKE_PER_BLOCK = new BigNumber(20);
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365); // 10512000
export const TOKEN_PER_BLOCK = 5;

/**
 * Get the APY value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @returns Null if the APY is NaN or infinite.
 */
export const getPoolApy = (stakingTokenPrice, rewardTokenPrice, totalStaked) => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(TOKEN_PER_BLOCK).times(BLOCKS_PER_YEAR);
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked);
  const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100);
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber();
};

export const getPriceBusd = async type => {
  const ZERO = new BigNumber(0);
  const COUNT = new BigNumber(10).pow(18);
  const current = contracts.UniswapV2Router;
  const target = contracts[type];
  const BUSD = contracts.BUSD;
  const contract = new Contract(current.abi, current.address, current.name);
  const res = await contract.call('getAmountsOut', [COUNT, [target.address, BUSD.address]]);
  if (res) {
    return new BigNumber(res[1]).div(new BigNumber(10).pow(18));
  }
  return ZERO;
};

/**
 * Get farm APY value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param poolLiquidity Total pool liquidity
 * @param quotaTokenName quota token in USD
 * @returns
 */

export const getFarmApy = async (poolWeight, poolLiquidity, quotaTokenName) => {
  const cakePriceUsd = await getPriceBusd('CHECK');
  const quotaPriceUsd = await getPriceBusd(quotaTokenName);
  console.log(cakePriceUsd.toJSON(), quotaPriceUsd.toJSON(), '--cake--and---quota----')
  const yearlyCakeRewardAllocation = CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR).times(poolWeight);
  console.log(yearlyCakeRewardAllocation.toJSON(), 'yearlyCakeRewardAllocation')
  const apy = yearlyCakeRewardAllocation
    .times(cakePriceUsd)
    .div(poolLiquidity)
    .div(quotaPriceUsd)
    .times(100);
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber();
};

export const getStakeApy = async (poolWeight, poolLiquidity, quotaTokenName) => {
  const cakePriceUsd = await getPriceBusd('FORK');
  const quotaPriceUsd = await getPriceBusd(quotaTokenName);
  console.log(cakePriceUsd.toJSON(), quotaPriceUsd.toJSON(), '--cake--and---quota----')
  const yearlyCakeRewardAllocation = CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR).times(poolWeight);
  console.log(yearlyCakeRewardAllocation, 'yearlyCakeRewardAllocation')
  const apy = yearlyCakeRewardAllocation
    .times(cakePriceUsd)
    .div(poolLiquidity)
    .div(quotaPriceUsd)
    .times(100);
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber();
};
