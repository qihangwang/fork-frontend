<!--
 * @Author: 
 * @Description: fixed nav
-->
<template>
  <div>
    <div class="fixed-menu">
      <el-menu :default-active="path1" class="el-menu-vertical-demo" router>
        <el-menu-item index="/farm">
          <span slot="title">Farm</span>
        </el-menu-item>
        <el-menu-item index="/cash">
          <span slot="title">Cash</span>
        </el-menu-item>
      </el-menu>
      <el-divider></el-divider>
      <div class="fixed-link">
        <el-col :span="24" class="item">
          <a href="https://twitter.com/ForkFinance" target="_balnk">
            <img src="https://fork-images.oss-cn-hongkong.aliyuncs.com/fork/twitter.png" />
            <span>Twitter</span>
          </a>
        </el-col>
        <el-col :span="24" class="item">
          <a href="https://t.me/forkfinance" target="_balnk">
            <img src="https://fork-images.oss-cn-hongkong.aliyuncs.com/fork/Telegram.png" />
            <span>Telegram</span>
          </a>
        </el-col>
        <el-col :span="24" class="item">
          <a href="https://fork-finance.medium.com/" target="_balnk">
            <img src="https://fork-images.oss-cn-hongkong.aliyuncs.com/fork/medium.png" />
            <span>Medium</span>
          </a>
        </el-col>
        <el-col :span="24" class="item">
          <a href="https://github.com/fork-finance/" target="_balnk">
            <img src="https://fork-images.oss-cn-hongkong.aliyuncs.com/fork/Logo GitHub.png" />
            <span>github</span>
          </a>
        </el-col>
        <el-col :span="24" class="item">
          <a href="https://docs.fork-finance.org/" target="_balnk">
            <img src="https://fork-images.oss-cn-hongkong.aliyuncs.com/fork/docs.png" />
            <span>Docs</span>
          </a>
        </el-col>
        <el-col :span="24" class="item">
          <a href="https://t.me/forkfinance_announcement" target="_balnk">
            <img src="https://fork-images.oss-cn-hongkong.aliyuncs.com/fork/mes.png" />
            <span>Announcement</span>
          </a>
        </el-col>
        <el-col :span="24" class=" fork">
          <img src="https://fork-finance.org/ico_lg_1_64@2x.png" />
          <span>${{ price }}</span>
          <a class="buy">Buy</a>
        </el-col>
      </div>
    </div>
  </div>
</template>
<script>
import { getPriceBusd } from '@/utils/apy';
export default {
  name: 'Aside',
  props: {
    path: String,
  },
  data() {
    return {
      activeIndex: '',
      price: '',
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
  async created() {
    const price = await getPriceBusd('FORK');
    if (Number(price) > 1) {
      this.price = Number(price).toFixed(2);
    } else {
      this.price = Number(price).toFixed(4);
    }
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
.fork {
  margin-top: 10px;
  display: flex;
  align-items: center;
  font-size: 12px;
  letter-spacing: 0.58px;
  padding-left: 20px;
  line-height: 20px;
  img {
    width: 20px;
    height: 20px;
    margin-right: 2px;
  }
}
.buy {
  color: #03a9f4;
  background: transparent;
  text-shadow: none;
  padding-left: 6px;
  padding-right: 6px;
  border: 1px solid #03a9f4;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-left: auto;
}
</style>
