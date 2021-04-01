<!--
 * @Author: lenghui
 * @Description: 固定侧边导航栏
-->
<template>
  <el-menu :default-active="path1" class="fixed-menu el-menu-vertical-demo" router>
    <el-menu-item index="/stake">
      <span slot="title">Stake</span>
    </el-menu-item>
    <el-menu-item index="/farm">
      <span slot="title">Farm</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'Aside',
  props: {
    path: String,
  },
  data() {
    return {
      activeIndex: '',
    };
  },
  computed: {
    path1() {
      if (this.path.includes('/earn')) {
        return '/earn';
      }
      return this.path;
    },
  },
  created() {
    // const base = process.env.VUE_APP_ROUTE_URL;
    // this.activeIndex = window.location.pathname.replace(base, '');
    // console.log(window.location.pathname)
    // if (this.activeIndex.includes('/earn')) {
    //   this.activeIndex = '/earn';
    // }
  },
};
</script>
<style lang="less" scoped>
.fixed-menu {
  position: fixed;
  background: transparent;
  border: none;
  top: 12rem;
  padding-left: 20px;
}
</style>
