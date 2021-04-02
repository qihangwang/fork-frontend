<!--
 * @Author: **
 * @Description: common headaer component
-->
<template>
  <div :class="[{ white1: drawerVisable }]">
    <!-- pc heder -->
    <div class="header pc-header hidden-xs-only">
      <div class="header-left">
        <a href="/">
          <img src="https://i.loli.net/2021/04/01/WEcd5aKH2fT1whR.png" />
          <span>ForkCoin</span>
        </a>
      </div>
      <div class="header-right">
        <template>
          <el-button v-show="accountLoad && !NetErrorBtn" type="primary" size="medium" @click="() => (visable = true)">
            {{ !netError && account ? account : 'Connect to a wallet' }}</el-button
          >
          <el-button v-show="accountLoad && NetErrorBtn" icon="el-icon-link" type="danger" size="medium"
            >Wrong Network</el-button
          >
        </template>
      </div>
    </div>
    <!-- phone header -->
    <div class="header-mobile hidden-sm-and-up">
      <div class="row">
        <div class="header-title">
          <img src="https://i.loli.net/2021/04/01/WEcd5aKH2fT1whR.png" />
          <router-link to="/stake">FORK<br />COIN</router-link>
        </div>
        <div class="header-menu-btn">
          <el-button circle @click="drawerVisable = !drawerVisable">
            <span class="menu-icon" v-if="!drawerVisable"></span>
            <span class="close-icon" v-else></span>
          </el-button>
        </div>
      </div>
      <div :class="['nav transition-all', { 'trans-show': drawerVisable, 'trans-hidden': !drawerVisable }]">
        <ul class="nav-menu">
          <li :class="{ active: path.indexOf('stake') > -1 }"><router-link to="/stake">Stake</router-link></li>
          <li :class="{ active: path.indexOf('farm') > -1 }"><router-link to="/farm">Farm</router-link></li>
        </ul>
      </div>
      <div :class="['wallet transition-all', { 'trans-show': !drawerVisable, 'trans-hidden': drawerVisable }]">
        <el-button
          v-show="accountLoad && !NetErrorBtn"
          type="primary"
          plain
          size="medium"
          class="margin-t"
          @click="() => connect()"
        >
          {{ !netError && account ? account : 'Connect to a wallet' }}
        </el-button>
        <el-button v-show="accountLoad && NetErrorBtn" class="margin-t" icon="el-icon-link" type="danger" size="medium"
          >Wrong Network</el-button
        >
      </div>
    </div>
    <Wallet :visable="visable" :close="closeWallet" />
    <div class="dialog" @touchmove.prevent v-show="drawerVisable" />
  </div>
</template>
<script>
import initWeb3 from '@/utils/web3';
import Wallet from '@/components/Wallet.vue';
export default {
  name: 'Header',
  components: {
    Wallet,
  },
  data() {
    return {
      visable: false,
      drawerVisable: false,
      netError: false,
    };
  },
  async created() {
    await initWeb3();
    await this.init();
    this.netError = this.chainId !== 56 && this.chainId !== 97;
  },
  computed: {
    path() {
      return this.$store.state.toPage;
    },
    account() {
      return this.plusXing(this.$store.state.account);
    },
    chainId() {
      return this.$store.state.chainId;
    },
    accountLoad() {
      return this.$store.state.accountLoad;
    },
    loaded() {
      return this.$store.state.loaded;
    },
    NetErrorBtn() {
      return this.$store.state.NetErrorBtn;
    },
  },
  watch: {
    chainId(v) {
      if (v == process.env.VUE_APP_NETWORK_ID) {
        this.netError = false;
      }
    },
  },
  methods: {
    async init() {
      const that = this;
      if (window.web3js) {
        // first common get chainId
        const chainId = await web3js.eth.getChainId();
        that.$store.dispatch('changeChain', { key: 'chainId', val: chainId });
        web3js.eth.getAccounts((error, result) => {
          console.log(result, 'res');
          if (!error && result.length > 0) {
            that.$store.dispatch('changeAccount', result[0]);
            that.$store.dispatch('changeWallet', 'MetaMask');
          }

          this.$store.commit('setAccountLoad');
        });
      } else {
        this.$store.commit('setAccountLoad');
      }
    },
    plusXing(str) {
      if (str.length > 0) {
        return str.substring(0, 5) + '...' + str.substring(str.length - 5);
      }
      return str;
    },
    closeWallet() {
      this.visable = false;
    },
    connect() {
      this.visable = true;
    },
    link(str) {
      this.$router.push({ path: str });
    },
  },
};
</script>
<style lang="less" scoped>
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
.white {
  background: #fff;
}
.header {
  display: flex;
  position: relative;
  align-items: center;
  z-index: 99;
  margin: auto;
  // padding: 30px 30px 0 30px;
  z-index: 999;
}
.header-left {
  img {
    width: 50px;
    height: 50px;
  }
  a {
    display: flex;
    align-items: center;
    color: #17adff;
    font-size: 30px;
    cursor: pointer;
  }
  span {
    margin-left: 10px;
  }
}
.header-right {
  margin-left: auto;
  flex: 1;
  text-align: right;
  position: relative;
}

.header-mobile {
  padding: 20px 16px 0;
  text-align: center;
  position: relative;
  z-index: 999;
  background: #ededf2;
}
.row {
  display: flex;
  justify-content: space-between;
}

.header-title {
  font-weight: 700;
  letter-spacing: 0.58px;
  font-size: 18px;
  color: #17adff;
  text-align: left;
  font-family: Poppins;
  line-height: 18px;
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
}
.header-menu-btn {
  vertical-align: middle;
  button {
    border: none;
    background: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.018);
    }
  }
}
.menu-icon {
  width: 24px;
  height: 24px;
  display: block;
  background: url('../assets/images/menu.png') no-repeat;
  background-size: 100% 100%;
}
.close-icon {
  width: 24px;
  height: 24px;
  display: block;
  background: url('../assets/images/close.png') no-repeat;
  background-size: 100% 100%;
}
.nav {
  overflow: hidden;
}
.nav-menu {
  background-color: transparent;
  border-right: none;
  padding-top: 2.75rem;
  li {
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: 0.58px;
    overflow: hidden;
    margin-bottom: 1rem !important;
    text-align: left;
  }
  li.active {
    color: @themeColor;
    font-weight: 700;
  }
}
// navdonghua
.trans-show {
  max-height: 260px;
  opacity: 1;
}
.trans-hidden {
  max-height: 0px;
  opacity: 0;
}
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.5s;
}

.edit {
  background: transparent;
  border: none;
}
.margin-t {
  margin-top: 10px;
}

@media only screen and (max-width: 767px) {
}

@media (min-width: 768px) {
  .header {
    padding: 30px 2rem 0;
  }
}
</style>
