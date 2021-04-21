<template>
  <div>
    <van-skeleton :row="10" class="m-skeleton skeleton" :loading="skeletonLoading">
      <div v-if="type == 0">
        <div>
          <div class="project">
            <div class="top">
              <div class="top-info">
                <!-- <img src="https://fork-images.oss-cn-hongkong.aliyuncs.com/bcakground_web_4.png" /> -->
                <img src="https://fork-finance.org/ico_lg_1_64@2x.png" />
                <span>FORK</span>
              </div>
              <button class="top-btn" @click="show = !show"><i :class="show ? 'up' : 'down'"></i></button>
            </div>
            <el-divider></el-divider>
            <collapse-transition>
              <div class="content" v-show="show">
                <el-row type="flex" class="flex-wrap">
                  <el-col class="item" :sm="24" :md="12" v-for="(item, index) of cashPools" :key="index">
                    <el-card shadow="hover">
                      <div :class="['type', `type-${index}`]">
                        <div class="step">
                          <img src="https://fork-images.oss-cn-hongkong.aliyuncs.com/step1.png" />
                          <span>First</span>
                        </div>
                        <div class="times">
                          <span>status:</span>
                          <template>
                            <span class="waiting">{{ times[item.timeStatus] }}</span>
                          </template>
                        </div>
                      </div>
                      <div class="card-wrap">
                        <div class="status-wrap">
                          <van-count-down :time="item.time">
                            <template #default="timeData" @finish="finishTime(item)">
                              <span
                                class="block"
                                v-html="timeData.hours < 10 ? `0${timeData.hours}` : timeData.hours"
                              ></span>
                              <span class="colon">:</span>
                              <span
                                class="block"
                                v-html="timeData.minutes < 10 ? `0${timeData.minutes}` : timeData.minutes"
                              ></span>
                              <span class="colon">:</span>
                              <span
                                class="block"
                                v-html="timeData.seconds < 10 ? `0${timeData.seconds}` : timeData.seconds"
                              ></span>
                            </template>
                          </van-count-down>
                        </div>
                        <ul class="info">
                          <li>
                            <span>Total FORK:</span><span>{{ item.cashTotal }}</span>
                          </li>
                          <li>
                            <span>CHECK deposited:</span><span>{{ item.stakeTotal }}</span>
                          </li>
                          <li>
                            <span>CHECK to burn:</span><span>{{ item.stakeTotal }}</span>
                          </li>
                          <li>
                            <span>CHECK you deposited:</span><span>{{ item.staked }}</span>
                          </li>
                          <li>
                            <span>FORK you'l receive:</span><span>{{ item.realTimeClaim || item.claim }}</span>
                          </li>
                        </ul>
                        <template>
                          <el-button class="btn" v-if="!account" type="primary" round @click="walletVisable = true"
                            >Unlock Wallet</el-button
                          >
                          <el-button
                            class="btn"
                            v-else-if="item.timeStatus == 2"
                            :disabled="item.realTimeClaim > 0"
                            type="primary"
                            round
                            >Cash</el-button
                          >
                          <template v-else>
                            <el-button class="btn" v-if="item.status == 0" type="primary" round @click="approve(item)"
                              >Approve</el-button
                            >
                            <el-button
                              class="btn"
                              v-else-if="item.status == 1"
                              type="primary"
                              round
                              @click="changeModel('Stake', item)"
                              >Depoist</el-button
                            >
                          </template>
                        </template>
                      </div>
                      <b class="dot" />
                    </el-card>
                  </el-col>
                </el-row>
                <div class="close">
                <span @click="show = false">Close<i class="up"></i></span>
              </div>
              </div>
            </collapse-transition>
          </div>
        </div>
        <Model
          :visable="modelVisable"
          :onOk="closeModel"
          :type="modelType"
          :data="activeItem"
          name="CHECK"
          depositMethods="depositCheckToCashPool"
          :onCanel="closeModel"
          :onClose="closeModel"
          ref="model"
        />
        <Wallet :visable="walletVisable" :close="closeWallet" />
      </div>
      <div v-if="type == 1" class="no-result">
        <img src="https://fork-images.oss-cn-hongkong.aliyuncs.com/no-result.png" />
        <div>No data temporarily</div>
      </div>
    </van-skeleton>
  </div>
</template>
<script>
import CollapseTransition from './collapse-transition';
import contracts from '@/config/contractObj';
import Contract from '@/utils/contract';
import Model from './Model.vue';
import Wallet from '@/components/Wallet.vue';
import { common } from '@/utils/common';

export default {
  name: 'CashItem',
  props: {
    type: [Number, String],
  },
  components: {
    Model,
    CollapseTransition,
    Wallet,
  },
  data() {
    return {
      show: true,
      skeletonLoading: true,
      contracts,
      poolsLength: 0,
      projects: [],
      cashPools: [],
      times: ['waiting', 'processing', 'finshed'],
      //modal
      modelType: '',
      modelVisable: false,
      activeItem: {},
      walletVisable: false,
    };
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
    renderProject() {
      return this.project.filter(() => {
        if (this.type == 0) {
          return true;
        }
        if (this.type == 1) {
          return true;
        }
        return false;
      });
    },
  },
  watch: {
    chainIdError(status) {
      if (!status) {
        this.init();
      } else {
        this.skeletonLoading = true;
      }
    },
    account(v) {
      if (!this.chainIdError && v) {
        this.AccountFn();
      }
    },
  },
  created() {
    if (!this.chainIdError) {
      this.init();
    }
  },
  methods: {
    async init() {
      this.skeletonLoading = true;
      await this.getPools();
      await this.AccountFn();
      this.skeletonLoading = false;
    },
    async AccountFn() {
      if (this.account) {
        await this.checkAllowance();
        await this.quertCheck();
        await this.calculationFork();
      }
    },
    // 1.first getpools, dont need accounts
    async getPools() {
      const that = this;
      const current = this.contracts.ForkFarm;
      const contract = new Contract(current.abi, current.address, current.name);
      //   await contract.call('poolLength', false, function(err, res) {
      //     if (!err) {
      //       that.poolsLength = res;
      //       console.log(res, 'res');
      //     }
      //   });
      const arr = [];
      for (let i = 0; i < 2; i++) {
        await contract.call('cashPoolInfo', i, function(err, res) {
          if (!err) {
            const obj = {
              status: 0,
              cashToken: res.cashToken,
              stakeToken: that.contracts.CHECK.address,
              cashTotal: web3js.utils.fromWei(res.cashTotal, 'ether'),
              stakeTotal: res.stakeTotal,
              projectId: res.projectId,
              startTime: res.startTime * 1000,
              endTime: res.endTime * 1000,
              currentTime: new Date().getTime(),
              staked: 0,
              realTimeClaim: 0,
              claim: 0,
            };
            if (obj.startTime > obj.currentTime) {
              obj.time = obj.startTime - obj.currentTime;
              obj.timeStatus = 0; //waiting
            } else if (obj.endTime > obj.currentTime) {
              obj.time = obj.endTime - obj.currentTime;
              obj.timeStatus = 1; //staring
            } else {
              obj.time = 0;
              obj.timeStatus = 2; //finshed
            }
            arr.push(obj);
          }
        });
      }
      this.cashPools = arr;
      console.log(arr, 'arr');
    },
    // 2. second get allowance
    async checkAllowance() {
      const that = this;
      const pools = this.contracts.ForkFarm;
      for (let i = 0; i < this.cashPools.length; i++) {
        const contract = new Contract(
          this.contracts['ERC20'].abi,
          this.cashPools[i].cashToken,
          this.contracts['ERC20'].name,
        );
        const res = await contract.allowance(this.account, pools.address, function(err, result) {
          if (!err) {
            const approveVal = Number(web3js.utils.fromWei(result, 'ether'));
            console.log(approveVal, 'approval');
            return approveVal;
          } else {
            return 0;
          }
        });
        if (res == 0 || !res) {
          that.cashPools[i].status = 0;
        } else {
          that.cashPools[i].status = 1;
        }
      }
    },
    //3. Query how many CHECKS are saved
    async quertCheck() {
      const that = this;
      const pool = this.contracts.ForkFarm;
      const contract = new Contract(pool.abi, pool.address, pool.name);
      for (let i = 0; i < this.cashPools.length; i++) {
        if (this.cashPools[i].status !== 0) {
          await contract.call('cashUserInfo', [i, this.account], { from: this.account }, function(err, res) {
            if (!err) {
              const item = that.cashPools[i];
              item.staked = web3js.utils.fromWei(res, 'ether');
            }
          });
        }
      }
    },
    //4. Calculation receiveFork
    async calculationFork() {
      const that = this;
      const pool = this.contracts.ForkFarm;
      const contract = new Contract(pool.abi, pool.address, pool.name);
      for (let i = 0; i < this.cashPools.length; i++) {
        if (this.cashPools[i].status != 0 && this.cashPools[i].staked != 0) {
          const item = that.cashPools[i];
          await contract.call('pendingClaim', [this.account, i], { from: this.account }, (err, res) => {
            if (!err) {
              item.realTimeClaim = web3js.utils.fromWei(res, 'ether');
            }
          });
          if (item.realTimeClaim == 0) {
            await contract.call('myClaim', [this.account, i], { from: this.account }, (err, res) => {
              const item = that.cashPools[i];
              if (!err) {
                item.claim = web3js.utils.fromWei(res, 'ether');
              }
            });
          }
        }
      }
    },
    // approve
    async approve(item) {
      let res = await common(this.approveFn, item.cashToken);
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
          console.log('approve success');
          callback(res);
        }
      });
    },
    // Interactive
    finishTime(item) {
      if (item.timeStatus == 0) {
        item.timeStatus = 1;
        item.time = item.endTime - new Date().getTime();
      }
      if (item.timeStatus == 1) {
        item.timeStatus = 2;
        item.time = 0;
      }
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
    closeWallet() {
      this.walletVisable = false;
    },
  },
};
</script>
<style lang="less" scoped>
.skeleton {
  padding-top: 40px;
}
.flex-wrap {
  flex-wrap: wrap;
}
.project {
  overflow: hidden;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 20%);
  background: #f3fbff;
  margin-top: 30px;
  border-radius: 16px;
}
.top {
  display: flex;
  padding: 16px 30px;
  justify-content: center;
  &-info {
    display: flex;
    align-items: center;
    // flex: 1;
    justify-content: center;
    img {
      width: 40px;
      height: 40px;
      margin-right: 20px;
    }
    span {
      font-size: 20px;
    }
  }
  &-btn {
    margin-left: auto;
    -webkit-box-align: center;
    align-items: center;
    border: 0px;
    border-radius: 16px;
    /* box-shadow: rgb(14 14 44 / 40%) 0px -1px 0px 0px inset; */
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
    height: 48px;
    padding: 0px 24px;
    background-color: #03a9f4;
  }
  &-btn:active {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
}
i {
  border: solid #fff;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
}
.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}
.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
/deep/.el-divider--horizontal {
  margin: 0;
  background: #d1d1d1;
}
.content {
  padding-top: 30px;
//   padding-bottom: 20px;
}
.item {
  padding: 0 16px;
  margin: 0 0 30px;
  border-radius: 16px;
  position: relative;

  .type {
    padding: 24px;
    font-size: 18px;
    color: #000;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }
  .type-0 {
    background: linear-gradient(rgb(167, 232, 241) 0%, rgb(148, 225, 242) 100%);
  }
  .type-1 {
    background: linear-gradient(rgb(226, 201, 251) 0%, rgb(205, 184, 250) 100%);
  }
  .status-wrap {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    align-items: center;
  }
  /deep/.el-card {
    position: relative;
    height: 100%;
    border-radius: 16px;
    overflow: hidden;
    background: radial-gradient(circle at 0 calc(100% - 90px), transparent 15px, #fff 6px) top left,
      linear-gradient(0.25turn, #fff, #fff),
      radial-gradient(circle at 20px calc(100% - 90px), transparent 15px, #fff 16px) bottom right;
    background-size: 20px 100%, calc(100% - 40px) 100%, 20px 100%;
    background-repeat: no-repeat;
    background-position: 0 0px, 20px 0px, calc(100% - 0px) 0px;
  }
  /deep/.el-card__body {
    padding: 0;
  }
  .card-wrap {
    padding: 20px;
  }
  .dot {
    position: absolute;
    right: 20px;
    left: 20px;
    top: calc(100% - 90px);
    height: 0;
    border-top: 2px dashed #d1c1c1;
  }
}

.info {
  font-size: 14px;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #03a9f4;
    line-height: 1.6;
    margin: 4px 0;
    font-weight: 400;
    > span:first-child {
      color: #000;
    }
  }
}
.status {
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 12px;
  transform: scale(0.9);
}
.finshed {
  color: #fff;
  background: #607d8b;
  .status;
}
.start {
  background: #03a9f4;
  color: #fff;
  .status;
}
.close {
  background: #fff;
  border-top: 1px solid rgb(233, 234, 235);
  color: #000;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin-top: 30px;
  i {
    border: solid #000;
    border-width: 0 2px 2px 0;
    margin-left: 10px;
    display: inline-block;
    vertical-align: middle;
    margin-top: 2px;
  }
}

.btn {
  margin: 60px 0 0px;
  box-shadow: rgba(14, 14, 44, 0.4) 0px -1px 0px 0px inset;
  font-size: 16px;
  height: 48px;
  padding: 0px 24px;
  background-color: rgb(31, 199, 212);
  color: white;
  width: 100%;
  letter-spacing: 0.03em;
  border-radius: 16px;
  border-color: #1fc7d4;
}
.times {
  color: #fff;
  font-weight: normal;
  font-size: 14px;
  line-height: 30px;
}
.waiting {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-left: 6px;
}
/deep/.van-count-down {
  margin: 20px auto;
  font-size: 28px;
  color: #03a9f4;
}
.block {
  display: inline-block;
  background: #dcf4ff;
  padding: 10px;
  border-radius: 10px;
  margin: 0 10px;
}
.step {
  display: flex;
  align-items: center;
  img {
    width: 36px;
    margin-right: 2px;
  }
}
.no-result {
  min-height: 650px;
}

@media only screen and (max-width: 767px) {
  .item {
    padding: 0 10px;
  }
  .item .type {
    padding: 10px 20px;
  }
}

@media only screen and (max-width: 991px) {
}
@media only screen and (min-width: 992px) {
}
@media only screen and (min-width: 1200px) {
  /deep/.van-count-down {
    font-size: 38px;
  }
  .block {
    padding: 20px;
  }
}
</style>
