<!--
 * @Author: lenghui
 * @Description: 固定侧边导航栏
-->
<template>
  <div class="fixed-menu">
    <el-menu :default-active="path1" class="el-menu-vertical-demo" router>
      <el-menu-item index="/stake">
        <span slot="title">Stake</span>
      </el-menu-item>
      <el-menu-item index="/farm">
        <span slot="title">Farm</span>
      </el-menu-item>
      <!-- <el-menu-item index="/earn">
      <span slot="title">Eran</span>
    </el-menu-item> -->
    </el-menu>
    <el-divider></el-divider>
    <div class="fixed-link">
      <el-col :span="24" class="item">
        <a>
          <img src="https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/icons/twitter.svg" />
          <span>Twitter</span>
        </a>
      </el-col>
      <el-col :span="24" class="item">
        <a>
          <img src="https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/icons/twitter.svg" />
          <span>Telegram</span>
        </a>
      </el-col>
      <el-col :span="24" class="item">
        <a>
          <img src="https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/icons/twitter.svg" />
          <span>Medium</span>
        </a>
      </el-col>
      <el-col :span="24" class="item">
        <a>
          <img src="https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/icons/twitter.svg" />
          <span>Docs</span>
        </a>
      </el-col>
    </div>
  </div>
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
  width: 190px;
  border: none;
  top: 12rem;
  padding-left: 20px;
}
.el-menu-vertical-demo {
  background: transparent;
}
.fixed-link {
  .item {
    font-size: 12px;
    letter-spacing: 0.58px;
    padding-left: 20px;
    line-height: 20px;
    cursor: pointer;
    &:hover {
      text-decoration-line: underline;
    }
    a {
      display: flex;
      align-items: center;
    }
  }
  img {
    width: 12px;
    height: 12px;
    margin-right: 10px;
  }
}
</style>
