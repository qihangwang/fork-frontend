<!--
 * @Author: lenghui
 * @Description: 公共头 分为四类
-->
<template>
  <div :class="[{ white1: drawerVisable }]">
    <!-- pc heder -->
    <div class="header pc-header hidden-sm-and-down">
      <div :class="['header-icon']"></div>
      <div class="header-title"><router-link to="/">FORK COIN</router-link></div>
      <div class="header-right">
        <template v-if="path == '/'">
          <el-button size="medium">Buy ALPACA</el-button>
          <el-button type="success" size="medium" @click="link('/stake')">
            Lanuch App
          </el-button>
        </template>
        <template v-else>
          <el-button
            v-show="accountLoad && !NetErrorBtn"
            type="primary"
            size="medium"
            :class="{ 'account-btn': accounts && !netError }"
            @click="() => (visable = true)"
          >
            {{ !netError && account ? account : 'Connect to a wallet' }}</el-button
          >
          <el-button v-show="accountLoad && NetErrorBtn" icon="el-icon-link" type="danger" size="medium"
            >Wrong Network</el-button
          >
        </template>
      </div>
    </div>
    <!-- 手机ipad header home首页 -->
    <div class="header  hidden-md-and-up" v-show="path == '/'">
      <div :class="['header-icon header-icon-1']"></div>
      <div class="header-title header-title1">
        <router-link to="/">FORK<br />COIN</router-link>
      </div>
      <div class="header-right">
        <el-button type="success" @click="() => link('/stake')" size="medium">Lanuch App</el-button>
      </div>
    </div>
    <!-- 手机opad header 其余页面 -->
    <div class="header-mobile hidden-md-and-up" v-show="path !== '/' && path !== ''">
      <div class="flex row">
        <div :class="['header-icon header-icon-1']"></div>
        <div class="header-title header-title1">
          <router-link to="/">FORK<br />COIN</router-link>
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
          <li :class="{ active: path.indexOf('earn') > -1 }"><router-link to="/earn">Earn</router-link></li>
        </ul>
      </div>
      <div :class="['wallet transition-all', { 'trans-show': !drawerVisable, 'trans-hidden': drawerVisable }]">
        <el-button
          v-show="accountLoad && !NetErrorBtn"
          type="success"
          plain
          size="medium"
          :class="['margin-t', { 'account-btn': accounts && !netError }]"
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
      netError: false, // 不管用户是否登录 如果节点不匹配 不显示出用户名
      accounts: '',
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
    // 当从正确的节点切换到不对的节点 才会显示节点错误
    NetErrorBtn() {
      return this.$store.state.NetErrorBtn;
    },
  },
  watch: {
    // 不能用计算属性做class绑定
    account(v) {
      this.accounts = v;
      console.log(v)
    },
    chainId(v) {
      if (v == 56 || v == 97) {
        this.netError = false;
      }
    },
  },
  methods: {
    // 正常获取到账号了
    async init() {
      console.log('获取');
      const that = this;
      if (window.web3js) {
        // 只有56 97才符合bsc
        const chainId = await web3js.eth.getChainId();
        that.$store.dispatch('changeChain', { key: 'chainId', val: chainId });
        web3js.eth.getAccounts((error, result) => {
          console.log(result, 'res');
          if (!error && result.length > 0) {
            that.$store.dispatch('changeAccount', result[0]);
            that.accounts = result[0];
            that.$store.dispatch('changeWallet', 'MetaMask');
          } //授权成功后result能正常获取到账号了
          // this.accountLoad = true;
          this.$store.commit('setAccountLoad');
        });
      } else {
        // this.accountLoad = true;
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
      console.log(1111);
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
.account-btn {
  background: #fff;
  color: #67c23a;
}
.header {
  display: flex;
  position: relative;
  align-items: center;
  z-index: 99;
  margin: auto;
  padding: 30px 30px 0 30px;
  z-index: 999;
}
.header-mobile {
  padding: 30px 30px 0 30px;
  text-align: center;
  position: relative;
  z-index: 999;
  background: #ededf2;
}
.header-right {
  margin-left: auto;
  flex: 1;
  text-align: right;
  position: relative;
}
.header-icon {
  width: 80px;
  height: 80px;
  margin-right: 30px;
  cursor: pointer;
  background: url('https://img.bee-cdn.com/large/3b9ae203lz1gonu6yvykvj20e80e8tbi.jpg') no-repeat;
  background-size: 100% 100%;
}
.header-icon-1 {
  width: 48px;
  height: 48px;
  margin-right: 10px;
}
.header-title {
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.58px;
  font-size: 2rem;
  color: @themeColor;
  text-align: left;
  font-family: Poppins;
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

.row {
  justify-content: flex-end;
  .header-title {
    flex: 1;
    align-self: center;
  }
}
//
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

.pc-header {
  padding: 30px 20px 0 20px;
  padding-right: 3rem;
}
@media (max-width: 640px) {
  .header-title1 {
    font-size: 1.5rem;
  }
}

@media only screen and (max-width: 767px) {
  .header,
  .header-mobile {
    padding: 20px 10px;
  }
  .header-icon {
    width: 50px;
    height: 50px;
    margin-right: 4px;
  }
  .header-title {
    font-size: 20px;
    line-height: 20px;
  }
}

@media (max-width: 992px) {
  .header-title1 {
    font-size: 1.125rem;
    line-height: 113%;
  }
  .pc-header {
    padding-right: 20px;
  }
  // .header-title {
  //   font-size: 30px;
  //   line-height: 30px;
  // }
}
</style>
