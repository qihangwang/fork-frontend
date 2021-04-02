<!--
 * @Author: lenghui
 * @Description: 钱包 授权用户，切换用户在这里完成
-->
<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="visable"
      width="50%"
      :before-close="handleClose"
      top="20vh"
      :class="['custom-dialog']"
    >
      <span slot="title">
        <h3 class="title" v-if="step == 0">Connect to a wallet</h3>
        <h3 class="title back" v-if="step == 1" @click="goStep(0)">Back</h3>
        <h3 class="title" v-if="step == 2">Account</h3>
      </span>
      <template v-if="step == 0">
        <div>
          <ul>
            <li
              v-for="(item, index) of list"
              :key="index"
              :class="['wallet-item', { active: item.walletName == wallet && account !== '' }]"
              @click="choseWallet(item.walletName)"
              disabled="true"
            >
              <span>
                <span v-if="item.walletName == wallet" class="circle" />
                {{ item.install ? '' : 'Install ' }}{{ item.walletName }}</span
              >
              <img :src="item.icon" class="wallet-icon" />
            </li>
          </ul>
        </div>
      </template>
      <template v-if="step == 1">
        <div>
          <ul>
            <li :class="['wallet-item', { error: connectError }]">
              <LoadingIcon v-if="!connectError">
                <span class="loading-text">Initializing</span>
              </LoadingIcon>
              <template v-else>
                <i class="el-icon-error error-icon"></i>
                <div class="line-span">
                  <span>An error has occured</span>
                  <span>{{ connectErrorMessage }}</span>
                </div>
              </template>
            </li>
          </ul>
        </div>
      </template>
      <template v-if="step == 2">
        <div class="wallet-account">
          <div class="line-1">
            <span>Connected with {{ wallet }}</span>
            <el-button type="primary" size="mini" plain @click="changeAccount">change</el-button>
          </div>
          <div class="line-2">
            <p>{{ plusXing(account) }}</p>
          </div>
          <div class="line-3">
            <span @click="copy">
              <i class="el-icon-copy-document"></i>
              <span class="spanText">Copy Address</span>
            </span>
          </div>
        </div>
      </template>
      <input
        id="copy"
        readonly
        type="text"
        value=""
        style="position: absolute; top: -20px; left: 0; opacity: 0; z-index: -10"
      />
    </el-dialog>
  </div>
</template>

<script>
import { connect, requestPermissions } from '@/utils/metamask';
import LoadingIcon from '@/components/LoadingIcon.vue';
export default {
  name: 'Wallet',
  components: {
    LoadingIcon,
  },
  props: {
    visable: Boolean,
    close: Function,
  },
  data() {
    return {
      step: 0, // 0钱包列表 1连接钱包 2连接显示account
      currentWallet: '',
      connectError: false,
      connectErrorMessage: '',
      dialogVisible: true,
      list: [
        {
          index: 1,
          walletName: 'MetaMask',
          name: 'metamask',
          icon: require('@/assets/images/metamask.png'),
          install: true, //是否安装
          src: 'https://metamask.io/', //官网
        },
      ],
    };
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
    chainId() {
      return this.$store.state.chainId;
    },
    chainIdStates() {
      return this.$store.state.chainId == process.env.VUE_APP_NETWORK_ID;
    },
    wallet() {
      return this.$store.state.wallet;
    },
  },
  watch: {
    account(v) {
      if (this.chainId == process.env.VUE_APP_NETWORK_ID) {
        this.step = v ? 2 : 0;
      }
    },
    chainId(v) {
      if (v == process.env.VUE_APP_NETWORK_ID) {
        this.step = this.account ? 2 : 0;
      }
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.checkMetamaskProvider();
    },
    // 检查是否安装小狐狸
    async checkMetamaskProvider() {
      const current = this.list.find(item => item.name == 'metamask');
      if (typeof window.ethereum == 'undefined') {
        current.install = false;
      } else {
        current.install = true;
      }
    },
    // 连接小狐狸
    async connctMetamask() {
      var accounts = await connect();
      if (accounts == false) {
        this.connectError = true;
        this.connectErrorMessage = 'No Ethereum provider was found on window.ethereum';
        return;
      }
      if (Array.isArray(accounts)) {
        const chainId = await web3js.eth.getChainId();
        this.$store.dispatch('changeAccount', accounts[0]);
        this.$store.dispatch('changeChain', { key: 'chainId', val: chainId });
        if (chainId !== process.env.VUE_APP_NETWORK_ID && chainId !== process.env.VUE_APP_NETWORK_ID) {
          this.connectError = true;
          this.connectErrorMessage = `Unsupported chain id: ${chainId}. Supported chain ids are: 56,97.`;
          console.log('connetc chaid error');
          return false;
        }
        this.$store.dispatch('changeWallet', this.currentWallet);
        this.close && this.close();
        this.connectError = false;
        console.log('connect success');
      } else {
        this.connectError = true;
        this.connectErrorMessage = 'The user rejected the request';
        console.log('connect error');
      }
    },
    // 选择那个钱包
    choseWallet(walletName) {
      if (walletName == this.wallet && this.chainIdStates) {
        this.step = 2;
        return;
      }
      this.step = 1;
      this.currentWallet = walletName;
      if (walletName == 'MetaMask') {
        this.connctMetamask();
      }
    },
    // 改变账户
    changeAccount() {
      requestPermissions();
    },
    goStep(num) {
      this.connectError = false;
      this.step = num;
    },
    copy() {
      const inputElement = document.getElementById('copy');
      inputElement.value = this.account;
      inputElement.select();
      document.execCommand('Copy');
      this.$message({
        message: 'copy successed!',
        type: 'success',
        duration: 2000,
      });
    },
    plusXing(str) {
      if (str.length > 0) {
        return str.substring(0, 5) + '...' + str.substring(str.length - 5);
      }
      return str;
    },
    handleClose() {
      this.close && this.close();
      this.connectError = false;
      this.step = this.account ? (this.chainIdStates ? 2 : 0) : 0;
    },
  },
};
</script>
<style lang="less">
.custom-dialog {
  .el-dialog {
    min-width: 320px;
    max-width: 500px;
  }
}
@media (max-width: 767px) {
  .custom-dialog {
    .el-dialog {
      min-width: calc(100vw - 30px);
    }
  }
}
</style>
<style lang="less" scoped>
.title {
  text-align: left;
}
.wallet-footer {
  text-align: center;
  font-size: 13px;
}
.wallet-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border: 1px solid rgb(237, 238, 242);
  border-radius: 10px;
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;
  .wallet-icon {
    width: 30px;
  }
  &:hover {
    border: 1px solid rgb(4, 193, 158);
  }
}
.wallet-item:last-child {
  margin-bottom: 0;
}
.wallet-item.active {
  cursor: default;
  background: #edeef2;
  &:hover {
    border: 1px solid rgb(237, 238, 242);
  }
}
.circle {
  height: 8px;
  width: 8px;
  margin-right: 4px;
  display: inline-block;
  background-color: rgb(39, 174, 96);
  border-radius: 50%;
}
.back {
  cursor: pointer;
  color: @themeColor;
}
.loading-text {
  margin-left: 10px;
}
.error {
  border: none;
  // color: #ff6871;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  margin-top: -20px;
  &:hover {
    border: none;
  }
  i {
    margin-right: 20px;
    font-size: 24px;
  }
  .line-span span {
    display: block;
    word-break: break-word;
  }
}
.error-icon {
  color: #ff6871;
}
.try {
  border-radius: 8px;
  font-size: 12px;
  color: rgb(0, 0, 0);
  background-color: #ced0d9;
  margin-left: 14px;
  padding: 8px;
  font-weight: 600;
  user-select: none;
  &:hover {
    background-color: rgb(168, 171, 179);
    border-color: #9aa1a8;
  }
}
//钱包
.wallet-account {
  color: #888d9b;
  text-align: left;
  border: 1px solid rgb(237, 238, 242);
  padding: 20px 10px;
  background: #fff;
  border-radius: 10px;
  .line-1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .line-2 {
    font-size: 20px;
    margin: 10px 0;
    color: #000;
    line-height: 24px;
  }
  .line-3 {
    > span {
      margin-right: 20px;
      cursor: pointer;
      &:hover {
        color: #565a69;
      }
    }
    a {
      color: #888d9b;
      text-decoration: none;
    }
    a:hover {
      color: #565a69;
      text-decoration: underline;
    }
  }
  .spanText {
    margin-left: 4px;
  }
}
</style>
