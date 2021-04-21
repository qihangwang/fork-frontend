<template>
  <div class="card">
    <p class="sum-title">Your rewards Check summary</p>
    <el-row :gutter="20" :type="clientWidth >= 992 ? 'flex' : ''" justify="space-around">
      <el-col :md="12" :sm="24">
        <div class="card-con card-flex">
          <div class="card-con-left">
            <div class="earn-title">Check earned :</div>
            <div>
              <van-skeleton class="h-skeleton" :row="1" :loading="totalSkeletonLoading" row-width="180">
                <span class="earn-count">{{ total > 0 ? total.toFixed(3) : 0 }}</span>
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
              <div class="ti">Your Check wallet balance :</div>
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
                  <span class="green lock-count">{{ lockMoney }}</span>
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
</template>
<script>
import Bus from '@/utils/bus.js';
import Contract from '@/utils/contract';
import contracts from '@/config/contractObj';
export default {
  name: 'Summary',
  data() {
    return {
      clientWidth: 0,
      totalSkeletonLoading: true,
      skeletonLoading: true,
      contracts,
      total: 0,
      walletMoney: 'N/A',
      lockMoney: 'N/A',
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
      }
    },
    chainIdError(status) {
      if (!status) {
        if (this.account) {
          this.init();
        }
      } else {
        this.totalSkeletonLoading = true;
        this.skeletonLoading = true;
      }
    },
  },
  created() {
    this.getWidth();
    window.addEventListener('resize', this.getWidth);
    if (this.account && !this.chainIdError) {
      this.init();
    }
  },
  mounted() {
    Bus.$on('changeEarn', val => {
      this.total = val;
      this.totalSkeletonLoading = false;
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWidth);
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
      await this.getCheck();
      // this.update();
      this.skeletonLoading = false;
    },
    async update() {
      console.log(new Date().getSeconds());
      this.timer = setTimeout(async () => {
        await this.getCheck();
        console.log(new Date().getSeconds());
        this.update();
      }, 10000);
    },
    async getCheck() {
      const current = this.contracts.CHECK;
      try {
        let contract = new Contract(current.abi, current.address, current.name);
        let walletMoney = await contract.getBalance(this.account, current.address);
        let lockMoney = await contract.call('lockOf', this.account);
        console.log(walletMoney, lockMoney, '222222');
        if (walletMoney) {
          this.walletMoney = Number(web3js.utils.fromWei(walletMoney, 'ether')).toFixed(2);
        }
        if (lockMoney) {
          this.lockMoney = Number(web3js.utils.fromWei(lockMoney, 'ether')).toFixed(2);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.card {
  margin-bottom: 30px;
}
.sum-title {
  font-size: 24px;
  font-weight: bold;
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
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
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

@media only screen and (max-width: 991px) {
  .sum-title {
    font-size: 20px;
  }
  .card-con-left {
    padding-left: 0;
  }
}
@media only screen and (max-width: 767px) {
  .sum-title {
    font-size: 16px;
  }
  .card-con  {
    border-radius: 0;
  }
}
@media only screen and (min-width: 992px) {
  .ti {
    font-size: 16px;
  }
  .card-con .earn-title {
    font-size: 20px;
  }
  .info {
    font-size: 13px;
  }
}
@media only screen and (min-width: 1200px) {
   .card-con .card-con-right img {
    width: 9rem;
  }
}
</style>
