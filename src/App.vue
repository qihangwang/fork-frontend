<template>
  <div id="app" :class="['white', { others: path !== '' }]">
    <el-container>
      <el-header>
        <Header v-if="path != 'countdown' && routeView" />
      </el-header>
      <el-container>
        <el-aside width="180px" class="hidden-xs-only" v-if="routeView">
          <Aside :path="path" />
        </el-aside>
        <el-main class="route-content">
          <router-view />
          <div class="blank"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Aside from '@/components/Aside';
import initWeb3 from '@/utils/web3';
export default {
  name: 'APP',
  components: {
    Header,
    Aside,
  },
  data() {
    return {
      routeView: false,
    };
  },
  computed: {
    path() {
      return this.$store.state.toPage;
    },
    accountLoad() {
      return this.$store.state.accountLoad;
    },
  },
  async created() {
    this.$router.onReady(() => {
      this.routeView = true;
    });
    await initWeb3();
  },
};
</script>
<style scoped>
.white {
  background: #fff;
}
.others {
  background: #ededf2;
}
.blank {
  height: 48px;
}
</style>
