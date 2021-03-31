<template>
  <div class="container">
    <div class="card option-card">
      <van-skeleton :row="8" class="m-skeleton" :loading="account == '' || skeletonLoading">
        <div class="type">
          <span class="hidden-sm-and-down">{{ type }}ing {{ tokenName1 }}</span>
          <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png" />
          <span class="hidden-md-and-up">{{ type }}ing {{ tokenName1 }}</span>
        </div>
        <div class="available">
          <span class="grey">Available Balance: {{ maxVal.toFixed(2) }} {{ tokenName1 }}</span>
          <div>
            <el-input
              class="input"
              :value="val"
              type="number"
              @input="vals => (Number(vals) >= Number(maxVal) ? (val = maxVal) : (val = vals))"
              :placeholder="type + ' Amount'"
              @mousewheel.native.prevent
            >
              <el-button slot="suffix" type="primary" class="max" size="small" @click="val = maxVal">MaX</el-button>
            </el-input>
          </div>
        </div>
        <div class="receive">
          You will receive:
          <span class="green">~ {{ receiveVal }} {{ type == 'Deposit' ? 'i' + tokenName1 : tokenName }}</span>
        </div>
        <div class="bottom">
          <span class="back" @click="goBack">&lt; Back</span>
          <el-button
            type="success"
            :disabled="status == 1 && (buttonDisabled || sendLoading)"
            plain
            size="medium"
            class="confirm"
            @click="confirm"
            >{{ status == 0 ? 'Approve' : 'Confirm' }}</el-button
          >
        </div>
      </van-skeleton>
    </div>
  </div>
</template>
<script>
import Contract from '@/utils/contract';
import contracts from '@/utils/contractObj';
import { common } from '@/utils/common';

export default {
  name: 'EarnInfo',
  data() {
    return {
      skeletonLoading: true,
      contracts,
      sendLoading: false,
      status: 0, // 0 未授权 1授权
      val: '',
      maxVal: 0,
    };
  },
  computed: {
    tokenName() {
      return this.$route.params.tokenName || '';
    },
    type() {
      return this.firstToUpper(this.$route.params.type) || '';
    },
    tokenName1() {
      return this.type == 'Deposit' ? this.tokenName : 'i' + this.tokenName;
    },
    buttonDisabled() {
      return this.val <= 0 || Number(this.val) > Number(this.maxVal);
    },
    account() {
      return this.$store.state.account;
    },
    chainId() {
      return this.$store.state.chainId;
    },
    receiveVal() {
      if (this.val) {
        return Number(this.val).toFixed(2);
      }
      return '0.00';
    },
  },
  created() {
    if (this.account) {
      this.getBalance();
      this.checkAllowance();
    }
  },
  watch: {
    account(v) {
      if (v) {
        if (this.chainId == 56 || this.chainId == 97) {
          this.getBalance();
          this.checkAllowance();
        }
      } else {
        this.skeletonLoading = true;
      }
    },
    chainId(v) {
      if (v == 56 || v == 97) {
        if (this.account) {
          this.getBalance();
          this.checkAllowance();
        }
      } else {
        this.skeletonLoading = true;
      }
    },
  },
  methods: {
    goBack() {
      this.$router.push({ path: '/earn' });
    },
    firstToUpper(str) {
      return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
    },
    changeMax(val) {
      this.val = val;
    },
    // 获取余额
    async getBalance() {
      const item =
        this.type == 'Deposit'
          ? this.tokenName == 'BNB'
            ? ''
            : this.contracts[this.tokenName]
          : this.contracts[`i${this.tokenName}`];
      try {
        // BNB转换iBNB 查询BNB 不是调用合约
        if (item == '') {
          const res = await web3js.eth.getBalance(this.account);
          this.maxVal = Number(web3js.utils.fromWei(res, 'ether'));
          this.skeletonLoading = false;
          return;
        }
        const contract = new Contract(item.abi, item.address, item.name);
        const res = await contract.getBalance(this.account, contract.address);
        if (res) {
          this.maxVal = Number(web3js.utils.fromWei(res, 'ether'));
          this.skeletonLoading = false;
        }
      } catch (err) {
        console.log(err);
        this.skeletonLoading = true;
        this.$message({
          duration: 5000,
          type: 'error',
          customClass: 'custom-message',
          message: err.reason || err,
        });
      }
    },
    // 只有send交易需要这个
    async deposit(callback) {
      const current = this.contracts[`i${this.tokenName}`];
      const amount = web3js.utils.toWei(String(this.val), 'ether');
      const contract = new Contract(current.abi, current.address, current.name);
      const params = this.tokenName == 'BNB' ? { from: this.account, value: amount } : { from: this.account };
      console.log(amount);
      return contract.send('deposit', amount, params, function(err, res) {
        if (!err) {
          console.log('存款成功', res);
          callback(res);
        }
      });
    },
    async withdraw(callback) {
      const current = this.contracts[`i${this.tokenName}`];
      const amount = web3js.utils.toWei(String(this.val), 'ether');
      const contract = new Contract(current.abi, current.address);
      return contract.send('withdraw', amount, { from: this.account }, function(err, res) {
        if (!err) {
          callback(res);
        }
      });
    },
    async confirm() {
      if (this.status == 0) {
        return this.approve();
      }
      this.sendLoading = true;
      const tempFn = this.type == 'Deposit' ? this.deposit : this.withdraw;
      let res = await common(tempFn);
      if (res) {
        this.maxVal = Number(this.maxVal) - Number(this.val);
        this.val = '';
      }
      this.sendLoading = false;
    },
    // 交易需要先进行授权
    async approve() {
      this.sendLoading = true;
      let res = await common(this.approveFn);
      if (res) {
        this.status = 0;
      }
      this.sendLoading = false;
    },
    async approveFn(callback) {
      const p = 'ether',
        quota = web3js.utils.toWei('1000000000000000000', p); //授权额度
      const item = this.contracts[this.tokenName];
      const target = this.contracts[`i${this.tokenName}`];
      const contract = new Contract(item.abi, item.address, item.name);
      return contract.approve(target.address, quota, { from: this.account }, function(err, res) {
        if (!err) {
          console.log('授权成功');
          callback(res);
        }
      });
    },
    // 查询合约允许的值
    async allowance() {
      if (this.tokenName == 'BNB' && this.type == 'Deposit') {
        if (this.account) {
          return true;
        }
      }
      const item = this.contracts[this.tokenName];
      const target = this.contracts[`i${this.tokenName}`];
      try {
        const contract = new Contract(item.abi, item.address, item.name);
        const res = await contract.allowance(this.account, target.address, function(err, res) {
          if (!err) {
            console.log(web3js.utils.fromWei(res, 'ether'), '授权允许的值');
            const approveVal = web3js.utils.fromWei(res, 'ether');
            return approveVal;
          } else {
            return 0;
          }
        });
        return res;
      } catch (err) {
        console.log('allow error');
        this.$message({
          duration: 5000,
          type: 'error',
          customClass: 'custom-message',
          message: err.reason || err,
        });
      }
    },
    // 检测合约是否已经授权过了
    async checkAllowance() {
      const approveVal = await this.allowance();
      if (approveVal == 0 || !approveVal) {
        this.status = 0;
      } else {
        this.status = 1;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.option-card {
  max-width: 800px;
  margin: 0 auto;
}
.type {
  display: flex;
  align-items: center;
  margin-top: 10px;
  span {
    margin-right: 10px;
    font-weight: bold;
    font-size: 24px;
  }
  img {
    width: 34px;
    height: 34px;
  }
}
.available {
  margin-top: 32px;
  span {
    font-size: 14px;
  }
}
.receive {
  font-size: 14px;
  margin-top: 10px;
}
.back {
  padding: 10px 15px;
  color: grey;
  cursor: pointer;
  &:hover {
    border-radius: 7px;
    background: rgba(0, 0, 0, 0.018);
  }
}
.bottom {
  display: flex;
  justify-content: space-between;
}
.confirm {
  padding: 10px 30px;
}
@media only screen and (max-width: 991px) {
  .bottom {
    margin: 30px 0 20px;
  }
  .type {
    flex-direction: column;
    img {
      width: 100px;
      height: 100px;
      margin-bottom: 10px;
    }
  }
}
@media only screen and (min-width: 992px) {
  .bottom {
    margin-top: 150px;
    margin-bottom: 20px;
  }
  .option-card {
    padding: 40px;
  }
}
</style>
