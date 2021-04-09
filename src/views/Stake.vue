<template>
  <div class="stake container">
    <div class="card">
      <p class="title">Your rewards summary</p>
      <el-row :gutter="20" :type="clientWidth >= 992 ? 'flex' : ''" justify="space-around">
        <el-col :md="12" :sm="24">
          <div class="card-con card-flex">
            <div class="card-con-left">
              <div class="earn-title">Fork earned :</div>
              <div>
                <van-skeleton class="h-skeleton" :row="1" :loading="totalSkeletonLoading" row-width="180">
                  <span class="earn-count">{{ total }}</span>
                </van-skeleton>
              </div>
            </div>
            <div class="card-con-right">
              <img src="https://i.loli.net/2021/04/02/FgLazD7Z3clnHKM.png" />
            </div>
          </div>
        </el-col>
        <el-col :md="12" :sm="24">
          <div :class="['card-con']">
            <div class="flex">
              <span class="icon wallet-icon" />
              <div>
                <div class="ti">Your FORK wallet balance :</div>
                <van-skeleton class="h-skeleton" :row="1" :loading="skeletonLoading" row-width="180">
                  <div class="count green">{{ walletMoney }}</div>
                </van-skeleton>
              </div>
            </div>
            <div class="flex lock">
              <div>
                <span class="icon lock-icon" />
              </div>
              <div>
                <div class="ti">
                  Locked amount :
                  <van-skeleton class="m-skeleton" :row="1" :loading="skeletonLoading">
                    <span class="green lock-count">{{ walletLock }}</span>
                  </van-skeleton>
                </div>
                <div class="info">
                  your locked balance will be available after 1 month: <a class="green">detail here</a>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="card card-margin">
      <StakeList ref="child" @change="changeEarn" />
    </div>
  </div>
</template>
<script>
import StakeList from '@/components/StakeList';
import Contract from '@/utils/contract';
import contracts from '@/config/contractObj';
export default {
  name: 'Stake',
  components: {
    StakeList,
  },
  data() {
    return {
      clientWidth: 0,
      skeletonLoading: true,
      totalSkeletonLoading: true,
      contracts,
      walletLock: 'N/A',
      walletMoney: 'N/A',
      total: 'N/A',
      timer: null,
    };
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  watch: {
    account(v) {
      if (v) {
        if (!this.chainIdError) {
          this.init();
        }
      } else {
        this.skeletonLoading = true;
        this.totalSkeletonLoading = true;
        this.total = 'N/A';
      }
    },
    chainIdError(status) {
      if (!status) {
        if (this.account) {
          this.init();
        }
      } else {
        this.totalSkeletonLoading = true;
        this.total = 'N/A';
        this.skeletonLoading = true;
      }
    },
  },
  created() {
    this.getWidth();
    window.addEventListener('resize', this.getWidth);
    if (this.account) {
      this.init();
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWidth);
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
  methods: {
    getWidth() {
      this.clientWidth = document.body.clientWidth;
    },
    async init() {
      this.totalSkeletonLoading = true;
      this.skeletonLoading = true;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      await this.getFork();
      this.skeletonLoading = false;
    },
    // get earn fork
    async getFork() {
      const current = this.contracts.FORK;
      let contract = new Contract(current.abi, current.address, current.name);
      let walletMoney = await contract.getBalance(this.account, current.address);
      let walletLock = await contract.call('lockOf', this.account);
      if (walletMoney) {
        this.walletMoney = Number(web3js.utils.fromWei(walletMoney, 'ether')).toFixed(2);
      }
      if (walletLock) {
        this.walletLock = Number(web3js.utils.fromWei(walletLock, 'ether')).toFixed(2);
      }
      // 钱包暂时没必要实时查询
      // this.timer = setTimeout(async () => {
      //   await this.getFork();
      // }, 5000);
    },
    // compute total
    changeEarn(val) {
      this.total = val.toFixed(2);
      this.totalSkeletonLoading = false;
    },
  },
};
</script>
<style lang="less" scoped>
.inline-skeleton {
  display: inline-block;
}
.title {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}
.card-flex {
  display: flex;
  justify-content: space-between;
  background: linear-gradient(108deg, #04abf67a, @themeColor 48.54%, #e2e2e2);
  color: #f2f2f2;
}
.card-con {
  margin: 10px 0;
  padding: 60px 16px;
  border-radius: 10px;
  position: relative;
  border: 1px solid #f0f0f0;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  .card-con-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 210px;
  }
  .earn-title {
    font-size: 18px;
    margin-bottom: 6px;
  }
  .earn-count {
    font-size: 1.875rem;
    z-index: 9;
    position: relative;
  }
  .card-con-right {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    img {
      width: 7rem;
      display: block;
      position: absolute;
      bottom: 0;
    }
  }
}
.card-con-left {
  padding-left: 20px;
}
.card-margin {
  margin-top: 20px;
}

.icon {
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-right: 16px;
}
.wallet-icon {
  background: url('../assets/images/wallet.png') no-repeat;
  background-size: 100% 100%;
}
.lock-icon {
  background: url('../assets/images/lock.png') no-repeat;
  background-size: 100% 100%;
}
.ti {
  font-size: 14px;
}
.count {
  font-size: 30px;
}
.lock {
  margin-top: 20px;
}
.lock-count {
  margin-left: 0.5rem;
  font-size: 1rem;
}
.info {
  font-size: 12px;
  color: rgb(156, 163, 175);
  max-width: 260px;
}

@media only screen and (max-width: 767px) {
  .card-con .card-con-left {
    padding-left: 0px;
  }
  .card-con .card-con-right img {
    width: 5rem;
  }
}

@media only screen and (max-width: 991px) {
  .card-con .card-con-left {
    min-height: 160px;
  }
}
@media only screen and (min-width: 992px) {
  .title {
    font-size: 24px;
    text-align: left;
    margin-bottom: 10px;
  }
  .card-con {
    .earn-title {
      font-size: 18px;
    }
    .earn-count {
      font-size: 50px;
      font-weight: bold;
    }
  }
  .ti {
    font-size: 18px;
  }
  .count {
    font-size: 50px;
  }
  .lock-count {
    font-size: 18px;
  }
  .icon {
    width: 30px;
    height: 30px;
  }
  .lock-icon {
    margin-top: 5px;
  }
}
@media only screen and (min-width: 1200px) {
  .card-con .card-con-right img {
    width: 9rem;
  }
}
</style>
