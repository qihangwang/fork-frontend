<template>
  <el-dialog
    :visible.sync="visable"
    :destroy-on-close="true"
    top="20vh"
    width="50%"
    :before-close="handleClose"
    :class="['custom-dialog']"
  >
    <template>
      <span slot="title">
        <h3 class="title">Depoist Fork Tokens</h3>
      </span>
      <van-skeleton :row="3" class="m-skeleton" :loading="account == '' || skeletonLoading">
        <p class="over">
          You have {{ maxVal == 0 ? 0 : Number(total).toFixed(3) }} BNB Availbe, can also deposit
          {{ Number(maxVal).toFixed(2) }} BNB
        </p>
        <el-input
          placeholder="please input amount"
          class="input"
          :value="val"
          @input="changeVal"
          type="number"
          @mousewheel.native.prevent
        >
          <el-button slot="suffix" type="primary" class="max" size="small" @click="changMax">Max</el-button>
        </el-input>
        <p class="over margin-t-10" v-show="val">
          you will receive {{ (Number(val) * this.price).toFixed(4) }} Fork Availbe
        </p>
      </van-skeleton>
      <span slot="footer" class="dialog-footer">
        <el-button @click="canel" round size="medium">cancle</el-button>
        <el-button type="primary" round size="medium" :disabled="disable" @click="confirm">confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import Contract from '@/utils/contract';
import contracts from '@/utils/contractObj';
import { common } from '@/utils/common';

export default {
  name: 'Model',
  props: {
    maxVal: [Number, String],
    price: [Number, String],
    index: [Number, String],
    visable: Boolean,
    onOk: Function,
    onCanel: Function,
    onClose: Function,
  },
  data() {
    return {
      val: '',
      total: 0,
      status: 1, //bnb dont need approve
      contracts,
      skeletonLoading: true,
      sendLoading: false,
    };
  },
  computed: {
    disable() {
      return Number(this.val) > Number(this.maxVal) || this.val <= 0 || this.sendLoading;
    },
    account() {
      return this.$store.state.account;
    },
    chainId() {
      return this.$store.state.chainId;
    },
  },
  watch: {
    visable() {
      if (this.visable == true && this.account !== '') {
        this.val = '';
        this.getBalance();
      }
    },
    account(v) {
      if (v) {
        if (this.chainId == process.env.VUE_APP_NETWORK_ID || this.chainId == process.env.VUE_APP_NETWORK_ID) {
          this.val = '';
          this.getBalance();
        }
      } else {
        this.skeletonLoading = true;
      }
    },
    chainId(v) {
      if (v == process.env.VUE_APP_NETWORK_ID || v == process.env.VUE_APP_NETWORK_ID) {
        if (this.account) {
          this.val = '';
          this.getBalance();
        }
      } else {
        this.skeletonLoading = true;
      }
    },
  },
  mounted() {
    const orignalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, newValue) {
      const setItemEvent = new Event('setItemEvent');
      setItemEvent.newValue = newValue;
      window.dispatchEvent(setItemEvent);
      orignalSetItem.apply(this, arguments);
    };
  },
  methods: {
    // getbalance user
    async getBalance() {
      try {
        const res = await web3js.eth.getBalance(this.account);
        this.total = Number(web3js.utils.fromWei(res, 'ether'));
        this.skeletonLoading = false;
      } catch (err) {
        this.skeletonLoading = true;
        this.$message({
          duration: 5000,
          type: 'error',
          customClass: 'custom-message',
          message: err.reason || err,
        });
      }
    },
    // deposit
    async deposit(callback) {
      const current = this.contracts[`MoonFund`];
      const amount = web3js.utils.toWei(String(this.val), 'ether');
      const contract = new Contract(current.abi, current.address, current.name);
      const params = { from: this.account, value: amount };
      console.log(params, 'params');
      return contract.send('deposit', [this.index, amount], params, function(err, res) {
        if (!err) {
          callback(res);
        }
      });
    },
    // sure transtion
    async confirm() {
      if (this.status == 0) {
        return this.approve();
      }
      this.sendLoading = true;
      let res = await common(this.deposit);
      if (res) {
        const recordList = {};
        const obj = {};
        const arr = [
          {
            val: this.val,
            time: new Date().Format('yyyy-MM-dd hh:mm:ss'),
          },
        ];
        obj[this.account.toLowerCase()] = arr;
        const item = localStorage.getItem('fundraisingData');
        const localRecordList = item ? JSON.parse(item) : {};
        if (localRecordList && typeof localRecordList[this.index] != 'undefined' && localRecordList[this.index]) {
          let localObj = localRecordList[this.index];
          localObj[this.account.toLowerCase()] = [...localObj[this.account.toLowerCase()], ...arr];
          recordList[this.index] = localObj;
        } else {
          recordList[this.index] = obj;
        }
        localStorage.setItem('fundraisingData', JSON.stringify(recordList));
        // this.maxVal = Number(this.maxVal) - Number(this.val);
        this.$emit('addTable');
        this.$emit('changeMax', Number(this.maxVal) - Number(this.val));
        this.total = Number(this.total) - Number(this.val);
        this.val = '';
      }
      this.sendLoading = false;
    },
    // approve acoount
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
    // checkallowance
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
        this.$message({
          duration: 5000,
          type: 'error',
          customClass: 'custom-message',
          message: err.reason || err,
        });
      }
    },
    // checkallow
    async checkAllowance() {
      const approveVal = await this.allowance();
      if (approveVal == 0 || !approveVal) {
        this.status = 0;
      } else {
        this.status = 1;
      }
    },
    canel() {
      this.val = '';
      this.onCanel && this.onCanel();
    },
    handleClose() {
      this.val = '';
      this.onClose && this.onClose();
    },
    ok() {
      this.val = '';
      this.onOk && this.onOk();
    },
    changeVal(vals) {
      if (Number(vals) > Number(this.maxVal)) {
        this.val = this.maxVal;
      } else {
        this.val = vals;
      }
    },
    changMax() {
      this.val = this.maxVal;
    },
    formatTimeStamp(ms) {
      let hours = parseInt(ms / (1000 * 60 * 60)),
        minutes = parseInt((ms % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = parseInt((ms % (1000 * 60)) / 1000);
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      return `${hours}:${minutes}:${seconds}`;
    },
  },
};
</script>
<style lang="less" scoped>
.title {
  text-align: left;
}
.max {
  width: 100%;
  height: 100%;
  background: transparent;
  color: #03a9f4;
  border: none;
  font-size: 16px;
  border-left: 1px solid #e5e7eb;
  &:hover {
    color: #2196f3;
    background: transparent;
    border-color: #e5e7eb;
  }
}
.over {
  text-align: left;
  margin-bottom: 10px;
  color: #17adff;
}
.line-1 {
  min-width: 0px;
  font-weight: 500;
  font-size: 20px;
  color: #000;
  margin: 30px 0 10px;
}
.line-2 {
  font-size: 12px;
  color: rgb(86, 90, 105);
}
.line-a {
  display: block;
  color: #04c19e;
  margin-bottom: 20px;
}
.margin-t-10 {
  margin-top: 10px;
}
</style>
