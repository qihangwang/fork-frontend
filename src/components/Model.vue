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
        <h3 class="title">{{ type }} LP Tokens</h3>
      </span>
      <van-skeleton :row="1" class="m-skeleton one-line-skeleton" :loading="account == '' || skeletonLoading">
        <div class="flex">
          <p class="over">Name : {{ name }} LP</p>
          <p class="over">Balance : {{ maxVal == 0 ? 0 : Number(maxVal).toFixed(3) }}</p>
        </div>
        <el-input
          placeholder="please input number"
          class="input"
          :value="val"
          @input="changeVal"
          type="number"
          @mousewheel.native.prevent
        >
          <el-button slot="suffix" type="primary" class="max" size="small" @click="changMax">Max</el-button>
        </el-input>
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
import BigNumber from 'bignumber.js/bignumber';

export default {
  name: 'Model',
  props: {
    type: String,
    data: Object,
    visable: Boolean,
    onOk: Function,
    onCanel: Function,
    onClose: Function,
  },
  data() {
    return {
      maxVal: '',
      val: '',
      total: 0,
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
    name() {
      return this.data.pool ? this.data.pool.name : '';
    },
  },
  watch: {
    visable() {
      if (this.visable == true && this.account !== '') {
        this.val = '';
        this.getBalance();
      }
    },
  },
  methods: {
    // getbalance user
    async getBalance() {
      try {
        if (this.type == 'Stake') {
          const contract = new Contract(
            this.contracts['ERC20'].abi,
            this.data.stakeToken,
            this.contracts['ERC20'].name,
          );
          const res = await contract.getBalance(this.account, this.data.stakeToken);
          if (res) {
            this.maxVal = web3js.utils.fromWei(res, 'ether');
          }
          this.skeletonLoading = false;
        } else {
          this.maxVal = this.data.staked;
          this.skeletonLoading = false;
        }
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
    // operating deposit token
    deposit(callback, val, index) {
      const current = this.contracts.ForkFarm;
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
      const current = this.contracts.ForkFarm;
      const amount = web3js.utils.toWei(String(val), 'ether');
      const contract = new Contract(current.abi, current.address);
      return contract.send('withdraw', [index, amount], { from: this.account }, function(err, res) {
        if (!err) {
          console.log('get widtdraw sucess', res);
          callback(res);
        }
      });
    },
    // sure
    async confirm() {
      this.sendLoading = true;
      const callback = this.type == 'Stake' ? this.deposit : this.withdraw;
      let res = await common(callback, this.val, this.data.index);
      if (res) {
        this.maxVal = new BigNumber(this.maxVal).minus(new BigNumber(this.val));
        this.data.staked =
          this.type == 'Stake' ? new BigNumber(this.data.staked).plus(new BigNumber(this.val)) : this.maxVal;
        this.val = '';
      }
      this.sendLoading = false;
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
  },
};
</script>
<style lang="less" scoped>
.title {
  text-align: left;
}
.flex {
  display: flex;
  justify-content: space-between;
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
</style>
