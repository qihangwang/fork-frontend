<template>
  <div id="app" :class="['white', { others: path !== '' }]">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container v-show="accountLoad">
        <el-aside width="200px" class="hidden-sm-and-down" v-if="path !== '/'">
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
