<template>
  <div class="list">
    <van-skeleton :row="9" class="m-skeleton skeleton" :loading="skeletonLoading">
      <!-- <el-row v-for="(farm, key, index) in renderList1" :key="index">
        <template>
          <div class="project-box">
            <div class="project">
              <img class="project-img" :src="farm.project.icon" />
              <div>
                <p class="project-name">
                  {{ farm.project.name }} <span class="project-coin">{{ farm.project.coin }}</span>
                </p>
                <div class="project-link">
                  <a
                    class="project-link-item"
                    v-for="(src, key, index) in farm.project.links"
                    :class="key"
                    :key="index"
                    :href="src"
                    target="_blank"
                  >
                    <img :src="icons[key]" />
                  </a>
                </div>

                <div class="project-desc">{{ farm.project.desc }}</div>
              </div>
            </div>
            <div class="project-right">
              <span>Project duration Farms: </span>
              <span>{{ farm.project.start }} / {{ farm.project.end }}</span>
            </div>
          </div>
        </template> -->
      <el-row :gutter="20" type="flex" class="card-con" v-if="list.length > 0">
        <template v-for="(item, index) of renderList">
          <el-col :key="index" :lg="8" :md="12" :sm="24">
            <div class="base-card">
              <el-card class="farms-card">
                <el-collapse>
                  <el-collapse-item title="Project Info" class="blue-pan">
                    <div class="project">
                      <img class="project-img" :src="item.project.icon" />
                      <div>
                        <p class="project-name">{{ item.project.name }}</p>
                        <div class="project-link">
                          <a
                            class="project-link-item"
                            v-for="(item, key, index) in item.project.links"
                            :class="key"
                            :key="index"
                            :href="item"
                            target="_blank"
                          >
                            <img :src="icons[key]" />
                          </a>
                        </div>
                        <span class="project-coin">{{ item.project.coin }}</span>
                      </div>
                    </div>
                    <div class="project-desc">{{ item.project.desc }}</div>
                  </el-collapse-item>
                </el-collapse>
                <div class="title-content base-flex">
                  <div class="icon">
                    <img :src="item.pool.icon" alt="" />
                  </div>
                  <div class="flex-item-end">
                    <div class="title">
                      <span>{{ item.pool.name || 'N/A' }}</span
                      ><span class="multipe">{{ (item.allocPoint / 100) * item.multiple }}X</span>
                    </div>
                  </div>
                </div>
                <div class="base-flex base-flex-item-lits" v-if="item.allocPoint != 0">
                  <div class="base-flex-content">APY:</div>
                  <div class="flex-item-end base-flex-number">{{ item.apy }}%</div>
                </div>
                <div class="base-flex base-flex-item-lits">
                  <div class="base-flex-content">Earn:</div>
                  <div class="flex-item-end base-flex-number">
                    CHECK
                  </div>
                </div>
                <div class="model-pan">
                  <div class="solo-title">
                    <span>CHECK</span>
                    <span>Earned</span>
                  </div>
                  <div class="base-flex base-flex-item-lits">
                    <div class="base-flex-content bold-num">
                      {{ item.rewards > 0 ? Number(item.rewards).toFixed(3) : 0 }}
                    </div>
                    <div class="flex-item-end base-flex-number">
                      <el-button
                        type="info"
                        :disabled="item.rewards == 0"
                        plain
                        :class="['gray-butn']"
                        v-if="item.status == 0"
                        >Harvest</el-button
                      >
                      <el-button
                        v-else
                        :disabled="item.rewards == 0"
                        @click="harvest(item, index)"
                        type="primary custom-border"
                        >Harvest</el-button
                      >
                    </div>
                  </div>
                  <div class="solo-title">
                    <span>{{ item.pool.name }} LP</span>
                    <span>Staked</span>
                  </div>
                  <template>
                    <el-button v-if="item.status == 0" type="primary" class="wallet" round @click="approve(item)"
                      >Approve</el-button
                    >
                    <div v-else class="stake-line">
                      <span class="bold-num">{{ item.staked>0?Number(item.staked).toFixed(3):0 }}</span>
                      <el-button
                        v-if="item.staked == 0"
                        type="primary custom-border"
                        @click="changeModel('Stake', item)"
                        >Stake LP</el-button
                      >
                      <div v-else>
                        <el-button type="info" plain class="gray-butn add" @click="changeModel('Unstake', item)">
                          -
                        </el-button>
                        <el-button type="info" plain class="gray-butn add" @click="changeModel('Stake', item)">
                          +
                        </el-button>
                      </div>
                    </div>
                  </template>
                  <div class="split-line"></div>
                  <el-collapse>
                    <el-collapse-item title="Details" name="1" class="hide-pan">
                      <div class="base-flex base-flex-item-lits">
                        <div class="base-flex-content">Total Liquidity</div>
                        <div class="flex-item-end base-flex-number">${{ item.totalUsdt }}</div>
                      </div>
                      <div class="goLink">
                        <a
                          href="https://exchange.pancakeswap.finance/#/add/BNB/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"
                          target="_blank"
                        >
                          <span>GET {{ item.pool.name }} LP</span>
                          <i class="el-icon-top-right"></i>
                        </a>
                      </div>
                      <div class="goLink">
                        <a :href="`https://bscscan.com/address/${item.stakeToken}`" target="_blank">
                          <span>View Contract</span>
                          <i class="el-icon-top-right"></i>
                        </a>
                      </div>
                      <div class="goLink">
                        <a :href="`https://pancakeswap.info/pair/${item.stakeToken}`" target="_blank">
                          <span>See Pair Info</span>
                          <i class="el-icon-top-right"></i>
                        </a>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </el-card>
            </div>
          </el-col>
        </template>
        <div v-if="renderList.length == 0" class="no-result">
          <img src="https://i.loli.net/2021/04/09/alXZG7gvhB18ws6.png" />
          <div>No data temporarily</div>
        </div>
      </el-row>
      <Wait v-else />
      <!-- </el-row> -->
    </van-skeleton>
    <Model
      :visable="modelVisable"
      :onOk="closeModel"
      :type="modelType"
      :data="activeItem"
      :onCanel="closeModel"
      :onClose="closeModel"
      ref="model"
    />
  </div>
</template>

<script>
import BigNumber from 'bignumber.js';
import Contract from '@/utils/contract';
import { common } from '@/utils/common';
import { getFarmApy, getPriceBusd } from '@/utils/apy';
import contracts from '@/config/contractObj';
import farmConfig from '@/config/farm.js';
import Model from './Model.vue';
import Wait from './Wait';

const FarmProject = farmConfig[process.env.VUE_APP_NETWORK_ID];

export default {
  name: 'FarmsCard',
  props: {
    type: [Number, String],
  },
  components: {
    Model,
    Wait,
  },
  data() {
    return {
      prices: {},
      contracts,
      skeletonLoading: true,
      poolsLength: 0,
      farms: {},
      list: [],
      icons: {
        twitter: 'https://i.loli.net/2021/04/09/Bm3l7vC4yWGxawd.png',
        medium: 'https://i.loli.net/2021/04/09/bpNCDcI6SWXuwZ3.png',
        telegram: 'https://i.loli.net/2021/04/09/lJAcrTzSuPVyRft.png',
        github: 'https://i.loli.net/2021/04/10/xAlrf4k29SFNDPI.png',
        website: 'https://i.loli.net/2021/04/10/YHRfnwAIDg24FNE.png',
      },
      modelType: '',
      modelVisable: false,
      activeItem: {},
      timer: null,
    };
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
    renderList() {
      return this.list.filter(item => {
        if (this.type == 0 && item.allocPoint > 0) {
          return true;
        }
        if (this.type == 1 && item.allocPoint == 0) {
          return true;
        }
        return false;
      });
    },
    // renderList1() {
    //   const farms = {};
    //   this.list.forEach(item => {
    //     farms[item.projectId] = farms[item.projectId] || {};
    //     farms[item.projectId].project = FarmProject[item.projectId];
    //     farms[item.projectId].pools = farms[item.projectId].pools || [];
    //     farms[item.projectId].pools.push(item);
    //   });
    //   return farms;
    // },
  },
  created() {
    if (this.account && !this.chainIdError) {
      this.init();
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
  watch: {
    account(v) {
      this.skeletonLoading = true;
      if (v) {
        if (!this.chainIdError) {
          this.init();
        }
      }
    },
    chainIdError(status) {
      this.timer && clearTimeout(this.timer);
      if (!status) {
        if (this.account) {
          this.init();
        }
      } else {
        this.skeletonLoading = true;
      }
    },
  },
  methods: {
    async init() {
      this.skeletonLoading = true;
      await this.getPools();
      await this.checkAllowance();
      await this.getStakedVal();
      await this.getForkReward();
      this.update();
      this.skeletonLoading = false;
      await this.getApys();
    },
    // The timer updates data every 10s
    async update() {
      this.timer = setTimeout(async () => {
        await this.getForkReward();
        this.update();
      }, 10000);
    },
    // first get pools
    async getPools() {
      const that = this;
      const current = this.contracts.ForkFarm;
      const contract = new Contract(current.abi, current.address, current.name);
      try {
        await contract.call('poolLength', false, function(err, res) {
          if (!err) {
            that.poolsLength = res;
          }
        });
        const multiple = process.env.VUE_APP_NETWORK_ID == '97' ? 8 : await contract.call('BONUS_MULTIPLIER'); //multiple
        const totalAllocPoint = await contract.call('totalAllocPoint'); //multiple
        let arr = [];
        // let farms = {};
        for (let index = 0; index < this.poolsLength; index++) {
          // alreay get pool stakeval and total

          await contract.call('poolInfo', index, function(err, res) {
            if (!err) {
              const project = FarmProject[res.projectId];
              res.project = project;
              // const project = FarmProject[res.projectId];
              if (typeof project.pools[index] == 'undefined') return;
              res.pool = project ? project.pools[index] : undefined;
              res.quoteToken = project ? project.pools[index]['quoteToken'] : undefined;
              res.token = project ? project.pools[index]['token'] : undefined;
              res.lpSupply = web3js.utils.fromWei(res.lpSupply, 'ether');
              const obj = {
                ...res,
                multiple,
                totalAllocPoint,
                status: 0,
                apy: 'N/A',
                staked: 0,
                rewards: 0,
                index,
              };
              // farms[res.projectId] = farms[res.projectId] || {};
              // farms[res.projectId].project = project;
              // farms[res.projectId].pools = farms[res.projectId].pools || [];
              // farms[res.projectId].pools.push(obj);
              arr.push(obj);
            }
          });
        }
        // this.farms = farms;
        this.list = arr;
      } catch {
        console.log('get pool length error');
      }
    },
    // second get allowance
    async checkAllowance() {
      const that = this;
      const pools = this.contracts.ForkFarm;
      for (let index = 0; index < this.list.length; index++) {
        const contract = new Contract(
          this.contracts['ERC20'].abi,
          this.list[index].stakeToken,
          this.contracts['ERC20'].name,
        );
        const res = await contract.allowance(this.account, pools.address, function(err, result) {
          if (!err) {
            const approveVal = Number(web3js.utils.fromWei(result, 'ether'));
            return approveVal;
          } else {
            return 0;
          }
        });
        if (res == 0 || !res) {
          that.list[index].status = 0;
        } else {
          that.list[index].status = 1;
        }
      }
    },
    // third get staked val and earn val
    async getStakedVal() {
      const that = this;
      const pool = this.contracts.ForkFarm;
      const contract = new Contract(pool.abi, pool.address, pool.name);
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].status !== 0) {
          await contract.call('userInfo', [i, this.account], { from: this.account }, function(err, res) {
            if (!err) {
              const item = that.list[i];
              item.staked = web3js.utils.fromWei(res.amount, 'ether');
            }
          });
        }
      }
    },
    async getForkReward() {
      const that = this;
      const pool = this.contracts.ForkFarm;
      const contract = new Contract(pool.abi, pool.address, pool.name);
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].status !== 0) {
          await contract.call('pendingCheck', [i, this.account], { from: this.account }, function(err, res) {
            if (!err) {
              const item = that.list[i];
              item.rewards = web3js.utils.fromWei(res, 'ether');
            }
          });
        }
      }
    },
    // four
    async getApys() {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].allocPoint == 0) {
          return false;
        }
        // 1. comput poolWeight
        this.list[i].poolWeight = new BigNumber(this.list[i].allocPoint).div(
          new BigNumber(this.list[i].totalAllocPoint),
        );
        const poolContract = new Contract(
          this.contracts['ERC20'].abi,
          this.list[i].stakeToken,
          this.contracts['ERC20'].name,
        );
        const quotaContract = new Contract(
          this.contracts['ERC20'].abi,
          this.list[i].quoteToken.address,
          this.contracts['ERC20'].name,
        );
        // compute totla
        const totalSupply = await poolContract.call('totalSupply');
        const quoteTokenBalanceLP = await quotaContract.call('balanceOf', this.list[i].stakeToken);

        // 2 comput lpTotalInQuoteToken
        if (totalSupply) {
          const lpTotalSupply = web3js.utils.fromWei(totalSupply, 'ether');
          // lp
          const lpTokenRatio = new BigNumber(this.list[i].lpSupply).div(new BigNumber(lpTotalSupply));
          const lpTotalInQuoteToken = new BigNumber(quoteTokenBalanceLP)
            .div(new BigNumber(10).pow(18))
            .times(new BigNumber(2))
            .times(lpTokenRatio);
          this.list[i].quoteTokenPrice = await getPriceBusd(this.list[i].quoteToken.name);
          this.list[i].lpTotalInQuoteToken = lpTotalInQuoteToken;
          let totalUsdt = new BigNumber(this.list[i].quoteTokenPrice).times(
            new BigNumber(this.list[i].lpTotalInQuoteToken),
          );
          // Single currency pledge
          if (this.list[i].token == undefined) {
            totalUsdt = new BigNumber(this.list[i].lpSupply).times(new BigNumber(this.list[i].quoteTokenPrice));
          }
          const apy = await getFarmApy(this.list[i].poolWeight, totalUsdt, this.list[i].multiple);
          this.list[i].apy = apy ? apy.toFixed(2) : 0;
          this.list[i].totalUsdt = totalUsdt.toFixed(4);
        }
      }
    },
    // approve
    async approve(item) {
      let res = await common(this.approveFn, item.stakeToken);
      if (res) {
        item.status = 1;
      }
    },
    async approveFn(callback, address) {
      const p = 'ether',
        quota = web3js.utils.toWei('100000000000000000', p); //授权额度
      const target = this.contracts.ForkFarm;
      const contract = new Contract(this.contracts['ERC20'].abi, address, this.contracts['ERC20'].name);
      return contract.approve(target.address, quota, { from: this.account }, function(err, res) {
        if (!err) {
          console.log('授权成功');
          callback(res);
        }
      });
    },
    // operating harvest token
    async harvest(item, index) {
      console.log(res);
      let res = await common(this.getHarvest, index);
      if (res) {
        item.rewards = 0;
      }
    },
    async getHarvest(callback, index) {
      const current = this.contracts.ForkFarm;
      const contract = new Contract(current.abi, current.address);
      return contract.send('harvest', index, { from: this.account }, function(err, res) {
        if (!err) {
          console.log('get reward suncess', res);
          callback(res);
        }
      });
    },
    changeModel(type, item) {
      this.modelVisable = true;
      this.modelType = type;
      this.activeItem = item;
    },
    closeModel() {
      this.modelVisable = false;
      this.activeItem = {};
      this.modelType = '';
    },
  },
};
</script>

<style lang="less" scoped>
.card-con {
  flex-wrap: wrap;
}
.list {
  margin: 30px 0;
  min-height: 400px;
}
.farms-card {
  display: inline-flex;
  width: 100%;
  margin: 15px 0;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;
  border-radius: 6px;
  .title-content {
    margin-bottom: 12px;
    .icon {
      position: relative;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 64px;
      max-width: 64px;
      max-height: 64px;
      width: 100%;
      padding-top: 0%;
      img {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        max-width: 100%;
      }
    }
    .title {
      font-size: 20px;
      margin-bottom: 4px;
      font-weight: bold;
      color: @themeColor;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
  .model-pan {
    padding-top: 15px;
    .wallet {
      width: 100%;
      border-radius: 16px;
      margin-top: 8px;
      box-shadow: rgba(14, 14, 44, 0.4) 0px -1px 0px 0px inset;
      font-weight: bold;
      min-height: 48px;
    }
  }
  .solo-title {
    font-weight: 600;
    line-height: 1.5;
    text-transform: uppercase;
    font-size: 12px;
    text-align: left;
    span:first-child {
      color: @themeColor;
      margin-right: 4px;
    }
    span:nth-child(2) {
      color: @deepFontColor;
    }
  }
  .gray-butn {
    background-color: #ededed;
    border-color: #e9eaeb;
    box-shadow: none;
    color: rgb(189, 194, 196);
    align-items: center;
    border: 0px;
    border-radius: 16px;
    height: 44px;
    padding: 0px 24px;
    outline: 0px;
    transition: background-color 0.2s ease 0s;
    box-shadow: rgba(14, 14, 44, 0.1) 0px -1px 0px 0px inset;
    &:hover {
      background-color: rgb(233, 234, 235);
      border-color: rgb(233, 234, 235);
    }
  }
  .add {
    color: #2196f3;
    font-size: 26px;
    line-height: 20px;
    &:hover {
      color: #2196f3;
      background-color: #f7f7f7;
    }
  }
  .custom-border {
    border-radius: 16px;
    height: 44px;
    box-shadow: rgba(14, 14, 44, 0.4) 0px -1px 0px 0px inset;
  }

  .stake-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    margin-top: 8px;
  }
  .bold-num {
    color: #023267;
    font-weight: 600;
    font-size: 22px;
  }
  .split-line {
    margin: 20px 0;
    height: 1px;
    background: rgb(233, 234, 235);
  }
  .el-collapse-item {
    border-width: 0;
  }
  .hide-pan {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    color: @themeColor;
    /deep/.el-collapse-item__header.is-active {
      text-align: center;
      display: inline-block;
    }
    /deep/.el-collapse-item__header {
      display: inline-block;
      color: @deepFontColor;
      font-size: 16px;
      font-weight: 600;
      line-height: 1.5;
    }
    /deep/.el-collapse-item__arrow {
      transform: rotate(-90deg);
    }
    /deep/ .el-collapse-item__arrow.is-active {
      transform: rotate(90deg);
    }
    /deep/.el-collapse-item__wrap {
      background-color: transparent;
      background: transparent;
      border-bottom-width: 0;
    }
    .goLink {
      color: rgb(31, 199, 212);
      font-size: 16px;
      font-weight: 600;
      line-height: 1.5;
      text-align: left;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}

.blue-pan {
  /deep/.el-collapse-item__header {
    padding-bottom: 10px;
    font-weight: bold;
    font-size: 16px;
    color: #1fc7d4;
    border-bottom: 1px solid #e9eaeb;
    margin-bottom: 10px;
  }
  /deep/.el-collapse-item__content {
    padding: 10px;
  }
  /deep/.el-collapse-item__wrap {
    background: rgba(32, 148, 240, 0.38);
    padding: 0px 10px;
    border-radius: 23px;
    margin-bottom: 10px;
  }
}
.project-box {
  display: flex;
  padding: 10px;
  background: #feeed7;
  border-radius: 12px;
  align-items: center;
}
.project-right {
  min-width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  > span:last-child {
    font-size: 20px;
    font-weight: bold;
  }
}
.project {
  display: flex;
  align-items: center;
  text-align: left;
  &-img {
    width: 50px;
    height: 50px;
    margin-right: 20px;
  }
  &-name {
    font-size: 20px;
    font-weight: bold;
  }
  &-coin {
    background: #ededed;
    color: #607d8b;
    border-radius: 16px;
    padding: 3px 16px;
    margin-top: 6px;
    display: inline-block;
    box-shadow: rgba(14, 14, 44, 0.1) 0px -1px 0px 0px inset;
    font-size: 13px;
    margin-left: 4px;
  }
  .project-link-item {
    width: 32px;
    height: 32px;
    display: inline-block;
    margin-right: 6px;
    padding: 8px;
    background: #fff;
    display: inline-flex;
    border-radius: 50%;
    > img {
      width: 100%;
    }
  }
}
.project-desc {
  text-align: left;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 14px;
  margin-top: 10px;
}
.multipe {
  border-radius: 16px;
  color: rgb(255, 255, 255);
  display: inline-flex;
  white-space: nowrap;
  padding: 2px 10px;
  font-size: 14px;
  background-color: #00bcd4;
}

.no-result {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 400px;
  height: 100%;
  flex-direction: column;
  > div {
    margin-top: 10px;
  }
}

.my-skeleton {
  min-width: 120px;
  height: 60px;
  padding: 0;
  .van-skeleton__row {
    width: 100% !important;
    height: 100%;
  }
}
.content-skeleton {
  min-width: 60px;
  height: 25px;
  padding: 0;
  .van-skeleton__row {
    width: 100% !important;
    height: 100%;
  }
}
@media (max-width: 767px) {
  .project-coin {
    font-size: 13px;
  }
}

@media (max-width: 991px) {
  .project-box {
    flex-direction: column;
  }
  .project-right {
    padding-left: 70px;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    margin-top: 10px;
    font-size: 14px;
    > span:last-child {
      font-size: 16px;
    }
  }
}
</style>
