import BigNumber from 'bignumber.js/bignumber';
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export const BSC_BLOCK_TIME = 3;
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
