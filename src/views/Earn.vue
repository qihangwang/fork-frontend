<template>
  <div class="earn container">
    <div class="card">
      <el-tabs v-model="activeName" class="custom-tabs">
        <el-tab-pane label="Total pool info" name="total" class="custom-tabs-pane">
          <div class="total">
            <div class="total-t">Total Deposits</div>
            <van-skeleton
              :row="1"
              :title="false"
              class="m-skeleton one-line-skeleton"
              row-width="100%"
              :loading="skeletonLoading"
            >
              <div class="total-v">{{ total }}</div>
            </van-skeleton>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Your info" name="your" class="custom-tabs-pane">
          <div class="total">
            <div class="total-t">Your Deposits</div>
            <van-skeleton
              :row="1"
              :title="false"
              class="m-skeleton one-line-skeleton"
              row-width="100%"
              :loading="skeletonLoading"
            >
              <div class="total-v">{{ yourTotal }}</div>
            </van-skeleton>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <PoolTable :data="tableData" :skeletonLoading="skeletonLoading" />
  </div>
</template>

<script>
import Contract from '@/utils/contract';
import contracts from '@/utils/contractObj';

import PoolTable from '@/components/PoolTable';
export default {
  name: 'Earn',
  components: {
    PoolTable,
  },
  data() {
    return {
      activeName: 'total',
      contracts,
      skeletonLoading: true,
      yours: 'N/A',
      tableData: [
        {
          name: 'BNB',
          total: 'N/A',
          blance: 'N/A',
          iblance: 'N/A',
        },
        {
          name: 'BUSD',
          total: 'N/A',
          blance: 'N/A',
          iblance: 'N/A',
        },
      ],
      tokenPrice: 0,
      timer: null,
    };
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
    total() {
      if (this.account) {
        const num = this.tableData.reduce((total, curr) => {
          if (curr.name == 'BNB') {
            return total + curr.total * this.tokenPrice;
          }
          return Number(total) + Number(curr.total);
        }, 0);
        return '$' + num.toFixed(2);
      }
      return 'N/A';
    },
    yourTotal() {
      if (this.account) {
        const num = this.tableData.reduce((total, curr) => {
          if (curr.name == 'BNB') {
            return total + curr.iblance * this.tokenPrice;
          }
          return Number(total) + Number(curr.iblance);
        }, 0);
        return '$' + num.toFixed(2);
      }
      return 'N/A';
    },
    chainId() {
      return this.$store.state.chainId;
    },
  },
  async created() {
    if (this.account) {
      this.init();
    }
  },
  watch: {
    account(v) {
      if (v) {
        if (this.chainId == 56 || this.chainId == 97) {
          this.init();
        }
      } else {
         this.skeletonLoading = true;
      }
    },
    chainId(v) {
      if (v == 56 || v == 97) {
        if (this.account) {
          this.init();
        }
      } else {
        this.skeletonLoading = true;
      }
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
  methods: {
    // 获取Available lending pools相关值
    async init() {
      this.skeletonLoading = true;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      await this.timeFn();
      this.skeletonLoading = false;
    },
    async timeFn() {
      console.log('请求数居了1');
      await this.getTokenPrice();
      await this.getTotalAndBalance();
      if (this.account) {
        await this.getAccountBalance();
      }
      // console.log('请求数居了2');
      this.timer = setTimeout(async () => {
        // console.log('请求数居了3');
        await this.timeFn();
      }, 6000);
    },
    // 获取bnb busd的total
    async getTotalAndBalance() {
      const tokens = ['BNB', 'BUSD'];
      for (let key of tokens) {
        const contract = new Contract(this.contracts[key].abi, this.contracts[key].address, this.contracts[key].name);
        if (contract.contract) {
          let curr = this.tableData.find(item => item.name == contract.name);
          const total = await contract.totalSupply();
          curr.total = Number(web3js.utils.fromWei(total, 'ether')).toFixed(2);
        }
      }
    },
    // 获取账户ibnb,ibusd相关的
    async getAccountBalance() {
      const tokens = ['BUSD', 'iBNB', 'iBUSD'];
      const contracts = [];
      for (let key of tokens) {
        contracts.push(new Contract(this.contracts[key].abi, this.contracts[key].address, this.contracts[key].name));
      }
      for (let item of contracts) {
        const blance = await item.getBalance(this.account, item.address);
        const index = item.name.includes('BNB') ? 0 : 1;
        if (item.name.includes('i')) {
          this.tableData[index].iblance = Number(web3js.utils.fromWei(blance, 'ether')).toFixed(2);
        } else {
          this.tableData[index].blance = Number(web3js.utils.fromWei(blance, 'ether')).toFixed(2);
        }
      }
      // 只有BNB数字货币的是调用web3
      const bnbVal = await web3js.eth.getBalance(this.account);
      this.tableData[0].blance = Number(web3js.utils.fromWei(bnbVal, 'ether')).toFixed(2);
    },
    // 获取BNB对标多少美元
    async getTokenPrice() {
      this.tokenPrice = 200;
    },
  },
};
</script>
<style lang="less" scoped>
.total {
  padding: 40px 0 50px;
  text-align: center;
  .total-t {
    font-size: 18px;
    margin-bottom: 8px;
  }
  .total-v {
    font-size: 34px;
    color: @themeColor;
  }
}
.m-skeleton {
  width: 60%;
  margin: 0 auto;
  max-width: 200px;
}
@media only screen and (max-width: 640px) {
  .total {
    .total-t {
      font-size: 14px;
    }
    .total-v {
      font-size: 30px;
    }
  }
}
</style>
