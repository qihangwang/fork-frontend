<!--
 * @Author: lenghui
 * @Description: 首页FAQS信息
-->
<template>
  <el-collapse v-model="activeNames" class="faqs">
    <el-collapse-item name="0">
      <template slot="title">
        <li>What is Alpaca Finance?</li>
      </template>
      <div>
        Alpaca Finance is a leveraged-yield farming protocol built on the Binance Smart Chain. It allows yield farmers
        to earn higher return by opening leveraged positions.
      </div>
    </el-collapse-item>
    <el-collapse-item name="1">
      <template slot="title">
        <li>与现实生活一致：与现实生活的流程、逻</li>
      </template>
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <li>与现实生活一致：与现实生活的流程、逻</li>
      </template>
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <li>与现实生活一致：与现实生活的流程、逻</li>
      </template>
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
export default {
  name: 'FAQS',
  data() {
    return {
      activeNames: [0],
    };
  },
};
</script>
<style lang="less">
.collapse-transition {
  transition: none !important;
  transition-duration: 0 !important;
}
.faqs {
  .el-collapse-item__arrow {
    margin: 0 20px 0 auto;
    transition: none;
    transform: none;
  }
  .el-collapse-item {
    border-radius: 20px;
    border: 1px solid #e2e2e2;
    margin-bottom: 20px;
    overflow: hidden;
    li {
      padding: 20px;
      width: 100%;
      font-size: 21px;
      font-weight: 500;
      color: #0f1228;
      font-family: 'element-icons';
      &::before {
        content: '\25CF';
        font-size: 12px;
        color: @themeColor;
        margin-right: 15px;
      }
    }
  }
  .el-collapse-item__content {
    font-size: 16px;
  }
  .el-collapse-item__header {
    background: transparent;
  }
  .el-collapse-item__wrap {
    padding: 0 20px;
    background: transparent;
  }

  .el-icon-arrow-right:before {
    content: '\002B';
    color: green;
    font-size: 24px;
    font-weight: bold;
  }
  .el-collapse-item__arrow.is-active::before {
    content: '\002D';
    color: green;
    font-size: 24px;
    font-weight: bold;
  }
}
@media only screen and (max-width: 767px) {
  .faqs {
    .el-collapse-item li {
      font-size: 15px;
    }
    .el-collapse-item__content {
      font-size: 13px;
    }
    .el-icon-arrow-right:before {
      font-size: 20px;
    }
  }
}
</style>
