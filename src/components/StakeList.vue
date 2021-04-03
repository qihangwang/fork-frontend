<!--
 * @Author: **
 * @Description: stake pools
-->
<template>
  <div>
    <p class="title">
      <van-skeleton class="m-skeleton" :row="1" :row-width="30" :loading="skeletonLoading">3</van-skeleton> Available
      staking Opportunities
    </p>
    <div class="list">
      <van-skeleton :row="6" class="m-skeleton skeleton" :loading="skeletonLoading">
        <el-collapse>
          <div v-for="(item, index) in list" :key="index">
            <p class="desc">
              {{ item.title }} <br />
              <span v-if="index == 0" class="desc-small"
                >(Read a step-by-step guide on how to get the LP token <a class="green">here</a>)</span
              >
            </p>
            <el-collapse-item>
              <template slot="title">
                <el-row class="collapse-line">
                  <el-col :span="3" class="imgs">
                    <div
                      :class="['img', { 'img-left': oindex == 0, 'img-right': oindex == 1 }]"
                      v-for="(img, oindex) in item.imgs"
                      :key="oindex"
                    >
                      <img :src="img" />
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="name">{{ item.name }}</div>
                  </el-col>
                  <el-col :span="4">
                    <span class="apy">APY {{ item.apy }}</span>
                  </el-col>
                  <el-col :span="9">
                    <span class="name earn">Alpaca Earned: {{ item.rewards.toFixed(2) }}</span>
                  </el-col>
                </el-row>
              </template>
              <el-row class="row">
                <el-col :md="9" :sm="12" :xs="24" class="flex-line">
                  <el-col :xs="24" class="line-title">
                    <span>I want to stake</span>
                    <span>Available {{ item.name }} Balance: {{ item.stake }}</span>
                  </el-col>
                  <el-col :xs="24" class="item">
                    <el-input
                      placeholder="0.00"
                      class="input"
                      :value="item.stakeInput"
                      type="number"
                      @mousewheel.native.prevent
                      @input="vals => (vals >= item.stake ? (item.stakeInput = item.stake) : (item.stakeInput = vals))"
                    >
                      <el-button
                        slot="suffix"
                        type="primary"
                        class="max"
                        @click="item.stakeInput = item.stake"
                        size="small"
                        >MaX</el-button
                      >
                    </el-input>
                    <el-button
                      :type="(item.stake <= 0 || item.stakeInput <= 0) && item.status !== 0 ? 'info' : 'primary'"
                      :disabled="(item.stake <= 0 || item.stakeInput <= 0) && item.status !== 0"
                      @click="confirm(item, 'stake', index)"
                      plain
                      size="medium"
                      class="btn"
                      >{{ item.status == 0 ? 'Approve' : 'Stake' }}</el-button
                    >
                  </el-col>
                </el-col>
                <el-col :md="9" :sm="12" :xs="24" class="flex-line">
                  <el-col :xs="24" class="line-title">
                    <span>I want to unstake</span>
                    <span>Staked {{ item.name }} Balance: {{ item.unstake }}</span>
                  </el-col>
                  <el-col :xs="24" class="item">
                    <el-input
                      placeholder="0.00"
                      class="input"
                      :value="item.unstakeInput"
                      @input="val => handleMax(val, item, 'unstake')"
                      type="number"
                      @mousewheel.native.prevent
                    >
                      <el-button
                        slot="suffix"
                        type="primary"
                        class="max"
                        size="small"
                        @click="item.unstakeInput = item.unstake"
                        >MaX</el-button
                      >
                    </el-input>
                    <el-button
                      :type="item.unstakeInput <= 0 || item.status == 0 ? 'info' : 'primary'"
                      :disabled="item.unstakeInput <= 0 || item.status == 0"
                      @click="confirm(item, 'unstake', index)"
                      plain
                      size="medium"
                      class="btn"
                    >
                      UnStake
                    </el-button>
                  </el-col>
                </el-col>
                <el-col :md="6" :sm="24" :xs="24" class="flex-line flex-line-claim">
                  <div class="line-title">Total Fork rewards:</div>
                  <div class="green total">{{ item.rewards.toFixed(2) }}</div>
                  <el-button
                    :type="item.rewards <= 0 ? 'info' : 'primary'"
                    plain
                    size="medium"
                    @click="confirm(item, 'claim', index)"
                    :disabled="item.rewards <= 0"
                    class="btn btn-top-10"
                    >Claim</el-button
                  >
                </el-col>
              </el-row>
            </el-collapse-item>
          </div>
        </el-collapse>
      </van-skeleton>
    </div>
  </div>
</template>
<script>
import Contract from '@/utils/contract';
import { common } from '@/utils/common';
import contracts from '@/utils/contractObj';
export default {
  name: 'StakeList',
  props: {
    data: Object,
  },
  data() {
    return {
      skeletonLoading: true,
      poolsLength: 0,
      contracts,
      list: [
        // {
        //   title: 'Stake Fork-WBNB LP token to earn ALPACA rewards',
        //   name: 'Fork-WBNB LP token',
        //   contract: 'UN2',
        //   status: 0,
        //   imgs: [
        //     'https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png',
        //     'https://img.bee-cdn.com/large/3b9ae203lz1gonu6yvykvj20e80e8tbi.jpg',
        //   ],
        //   apy: '1000%',
        //   quota: 0,
        //   quotaInput: 0,
        //   stake: 0,
        //   stakeInput: '',
        //   unstake: 0,
        //   unstakeInput: '',
        //   rewards: 0,
        // },
      ],
      totalEarn: 0,
      timer: null,
    };
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
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  // Clear the timer when changes account or chain
  watch: {
    account(v) {
      this.skeletonLoading = true;
      if (v) {
        this.timer && clearTimeout(this.timer);
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
        this.totalSkeletonLoading = true;
      }
    },
  },
  methods: {
    handleMax(val, item, type) {
      if (type == 'unstake') {
        item.unstakeInput = Number(val) >= Number(item.unstake) ? item.unstake : val;
      } else {
        item.stakeInput = Number(val) >= Number(item.stake) ? item.stake : val;
      }
    },
    async init() {
      this.skeletonLoading = true;
      // if (this.timer) {
      //   clearTimeout(this.timer);
      //   this.timer = null;
      // }
      // await this.checkAllowance();
      // await this.getListInfo();
      await this.getPools();
      await this.getStake();
      await this.getPool();
      this.update();
      this.skeletonLoading = false;
    },
    // The timer updates data every 10s
    async update() {
      console.log(new Date().getSeconds());
      this.timer = setTimeout(async () => {
        await this.getStake();
        await this.getPool();
        console.log(new Date().getSeconds());
        this.update();
      }, 10000);
    },
    // first: get pools
    async getPools() {
      const that = this;
      const current = this.contracts.IFairLaunch;
      const contract = new Contract(current.abi, current.address, current.name);
      // try {
      await contract.call('poolLength', false, function(err, res) {
        if (!err) {
          that.poolsLength = res;
        }
      });
      // }
      //  catch {
      //   console.log('error');
      // }
      let arr = [];
      for (let i = 0; i < this.poolsLength; i++) {
        await contract.call('poolInfo', i, function(err, res) {
          if (!err) {
            const obj = {
              title: 'Stake iBUSD to earn Fork rewards', //title
              name: 'FORK',
              status: 0, // 是否授权
              imgs: ['https://img.bee-cdn.com/large/3b9ae203lz1gonu6yvykvj20e80e8tbi.jpg'], //icon
              apy: '1000%', //回报
              tokenAdress: res.stakeToken, // 左边可质押的合约地址
              stake: 0, //左边还可以质押了多少
              stakeInput: '',
              unstake: 0, //右边还可以解押了多少
              unstakeInput: '',
              rewards: 0, //奖励
            };
            arr.push(obj);
          }
        });
      }
      this.list = arr;
    },
    // second: Get information about the stake token
    async getStake() {
      await this.checkAllowance();
      await this.getStakeVal();
    },
    // get stake allowance
    async checkAllowance() {
      const that = this;
      const pools = this.contracts.IFairLaunch;
      for (let index = 0; index < this.poolsLength; index++) {
        const contract = new Contract(
          this.contracts['ERC20'].abi,
          this.list[index].tokenAdress,
          this.contracts['ERC20'].name,
        );
        const res = await contract.allowance(this.account, pools.address, function(err, result) {
          if (!err) {
            const approveVal = Number(web3js.utils.fromWei(result, 'ether'));
            // console.log(approveVal, index, 'approveVal');
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
    // get stake quota
    async getStakeVal() {
      for (let i = 0; i < this.poolsLength; i++) {
        const tokenAdress = this.list[i].tokenAdress;
        const contract = new Contract(this.contracts['ERC20'].abi, tokenAdress, this.contracts['ERC20'].name);
        const res = await contract.getBalance(this.account, tokenAdress);
        if (res) {
          this.list[i].stake = web3js.utils.fromWei(res, 'ether');
          // console.log('stake', i, web3js.utils.fromWei(res, 'ether'));
        }
      }
    },
    // third: Get information about the pool
    async getPool() {
      await this.getUnStakeVal();
      await this.getForkReward();
    },
    async getUnStakeVal() {
      const pool = this.contracts.IFairLaunch;
      const contract = new Contract(pool.abi, pool.address, pool.name);
      for (let i = 0; i < this.poolsLength; i++) {
        const res = await contract.call('userInfo', [i, this.account], { from: this.account });
        if (res) {
          this.list[i].unstake = web3js.utils.fromWei(res.amount, 'ether');
          // console.log('unstake', i, web3js.utils.fromWei(res.amount, 'ether'));
        }
      }
    },
    async getForkReward() {
      const that = this;
      that.totalEarn = 0;
      const pool = this.contracts.IFairLaunch;
      const contract = new Contract(pool.abi, pool.address, pool.name);
      for (let i = 0; i < this.poolsLength; i++) {
        await contract.call('pendingAlpaca', [i, this.account], { from: this.account }, function(err, res) {
          if (!err) {
            const item = that.list[i];
            item.rewards = Number(web3js.utils.fromWei(res, 'ether'));
            // console.log('reward', i, web3js.utils.fromWei(res, 'ether'));
            that.totalEarn += item.rewards;
          }
        });
      }
      that.$emit('change', that.totalEarn);
    },
    // approve
    async approve(item) {
      let res = await common(this.approveFn, item.tokenAdress);
      if (res) {
        item.status = 1;
      }
    },
    async approveFn(callback, address) {
      const p = 'ether',
        quota = web3js.utils.toWei('100000000000000000', p); //授权额度
      const target = this.contracts.IFairLaunch;
      const contract = new Contract(this.contracts['ERC20'].abi, address, this.contracts['ERC20'].name);
      return contract.approve(target.address, quota, { from: this.account }, function(err, res) {
        if (!err) {
          console.log('授权成功');
          callback(res);
        }
      });
    },
    // confirm edit type : approve stake unstake harvest
    async confirm(item, type, index) {
      if (item.status == 0) {
        return this.approve(item);
      }
      if (type == 'stake') {
        let res = await common(this.deposit, item.stakeInput, index);
        if (res) {
          item.stake = item.stake - item.stakeInput;
          item.stakeInput = '';
        }
      } else if (type == 'unstake') {
        let res = await common(this.withdraw, item.unstakeInput, index);
        if (res) {
          item.unstake = item.unstake - item.unstakeInput;
          item.unstakeInput = '';
        }
      } else {
        let res = await common(this.getRewards, index);
        if (res) {
          item.rewards = 0;
        }
      }
    },
    // operating deposit token
    deposit(callback, val, index) {
      const current = this.contracts.IFairLaunch;
      const amount = web3js.utils.toWei(String(val), 'ether');
      const contract = new Contract(current.abi, current.address, current.name);
      return contract.send('deposit', [index, amount], { from: this.account }, function(err, res) {
        if (!err) {
          console.log('get deposit sucess', res);
          callback(res);
        }
      });
    },
    // operating withdraw token
    withdraw(callback, val, index) {
      const current = this.contracts.IFairLaunch;
      const amount = web3js.utils.toWei(String(val), 'ether');
      const contract = new Contract(current.abi, current.address);
      return contract.send('withdraw', [index, amount], { from: this.account }, function(err, res) {
        if (!err) {
          console.log('get widtdraw sucess', res);
          callback(res);
        }
      });
    },
    // operating harvest token
    getRewards(callback, index) {
      const current = this.contracts.IFairLaunch;
      const contract = new Contract(current.abi, current.address);
      return contract.send('harvest', index, { from: this.account }, function(err, res) {
        if (!err) {
          console.log('get reward suncess', res);
          callback(res);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.list {
  margin-bottom: 20px;
}
.skeleton {
  margin-top: 20px;
}
.title {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: center;
}
.collapse-line {
  padding: 20px 0;
  display: flex;
  width: 100%;
  align-items: center;
}
.line-title {
  color: #9ca3af;
  span {
    display: block;
    font-size: 12px;
  }
  span:fist-child {
    font-weight: bold;
  }
  span:last-child {
    height: 42px;
  }
}
.imgs {
  display: grid;
  position: relative;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 4px;
  .img {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row: 1;
    z-index: 1;
    display: flex;
  }
  .img-left {
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 3;
  }
  .img-right {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row: 1;
    z-index: 1;
  }
  img {
    width: 100%;
    max-width: 80px;
  }
}
.name {
  font-weight: bold;
  padding: 0 4px;
  word-break: break-all;
}
.apy {
  background-color: @themeColor;
  color: #fff;
  border-radius: 4px;
  display: block;
  text-align: center;
}
.earn {
  text-align: center;
  display: block;
}
.item {
  margin-bottom: 20px;
}
.total {
  font-size: 36px;
  text-align: center;
}
.btn {
  width: 100%;
  margin-top: 20px;
}
.btn-top-10 {
  margin-top: 10px;
}
.desc {
  font-size: 14px;
  margin: 30px 0 10px 0;
}
.desc-small {
  font-size: 12px;
}
.visable {
  display: none;
}
@media only screen and (max-width: 767px) {
  .desc {
    margin: 10px 0 10px 0;
  }
}
@media only screen and (min-width: 768px) {
  .desc {
    font-size: 18px;
  }
  .flex-line {
    padding: 0 20px;
  }
  .visable {
    display: inline-block;
    visibility: hidden;
  }
  .title {
    font-size: 24px;
  }
}
@media only screen and (min-width: 992px) {
  .total {
    height: 90px;
    line-height: 110px;
  }
}
</style>
