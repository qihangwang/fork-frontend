<template>
  <div id="app" :class="['white', { others: path !== '' }]">
    <el-container>
      <el-header>
        <Header v-if="path != 'countdown'" />
      </el-header>
      <el-container v-show="path == '/countdown' || accountLoad">
        <el-aside width="180px" class="hidden-xs-only" v-if="path != '/countdown'">
          <Aside :path="path" />
        </el-aside>
        <el-main class="route-content">
          <router-view :key="$route.fullPath" />
          <div class="blank"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Aside from '@/components/Aside';
export default {
  name: 'APP',
  components: {
    Header,
    Aside,
  },
  computed: {
    path() {
      return this.$store.state.toPage;
    },
    accountLoad() {
      return this.$store.state.accountLoad;
    },
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
