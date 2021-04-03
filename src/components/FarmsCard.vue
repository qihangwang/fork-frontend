<template>
  <div class="list">
    <van-skeleton :row="8" class="m-skeleton skeleton" :loading="false">
      <el-row :gutter="20">
        <el-col v-for="item in FarmsList" :key="item.id" :md="12" :sm="24">
          <!-- 这里是组件 -->
          <div class="base-card">
            <!-- <FarmsCard :data="item" /> -->
            <el-card class="farms-card">
              <div class="title-content base-flex">
                <div class="icon">
                  <!-- <van-skeleton :row="1" class="large-skeleton" :loading="skeletonLoading"> -->
                    <img :src="item.icon" alt="" />
                  <!-- </van-skeleton> -->
                </div>
                <div class="flex-item-end">
                  <!-- <van-skeleton :row="1" class="my-skeleton" :loading="skeletonLoading"> -->
                    <div class="title">{{ item.title || 'N/A' }}</div>
                  <!-- </van-skeleton> -->
                </div>
              </div>
              <div class="base-flex base-flex-item-lits">
                <div class="base-flex-content">APR:</div>
                <div class="flex-item-end base-flex-number">
                  <!-- <van-skeleton :row="1" class="content-skeleton" :loading="skeletonLoading"> -->
                    {{ Number(item.apr || 0).toFixed(2) }}%
                  <!-- </van-skeleton> -->
                </div>
              </div>
              <div class="base-flex base-flex-item-lits">
                <div class="base-flex-content">Earn:</div>
                <div class="flex-item-end base-flex-number">
                  <!-- <van-skeleton :row="1" class="content-skeleton" :loading="skeletonLoading"> -->
                    {{ item.earn }}
                  <!-- </van-skeleton> -->
                </div>
              </div>
              <div class="model-pan">
                <div class="solo-title">
                  <span>CAKE</span>
                  <span>Earned</span>
                </div>
                <div class="base-flex base-flex-item-lits">
                  <div class="base-flex-content grey-tite">{{ item.earned }}</div>
                  <div class="flex-item-end base-flex-number">
                    <el-button type="info" plain disabled class="gray-butn">Harvest</el-button>
                  </div>
                </div>
                <div class="solo-title">
                  <span>CAKE-BNB LP</span>
                  <span>Staked</span>
                </div>
                <el-button type="primary" class="wallet" round>Unlock Wallet</el-button>
                <!-- 切割线 -->
                <div class="split-line"></div>
                <el-collapse v-model="activeNames">
                  <el-collapse-item :title="activeNames[0] === '1' ? 'Hide' : 'Details'" name="1" class="hide-pan">
                    <div class="base-flex base-flex-item-lits">
                      <div class="base-flex-content">Total Liquidity</div>
                      <div class="flex-item-end base-flex-number">
                        <!-- <van-skeleton :row="1" class="content-skeleton" :loading="skeletonLoading"> -->
                          ${{ item.total }}
                        <!-- </van-skeleton> -->
                      </div>
                    </div>
                    <div class="goLink" v-for="val in item.link" :key="val.name" @click="() => goLink(val.url)">
                      {{ val.name }}
                      <i class="el-icon-top-right"></i>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </van-skeleton>
  </div>
</template>

<script>
export default {
  name: 'FarmsCard',
  props: {
    type: [Number, String],
  },
  data() {
    return {
      FarmsList: [
        {
          id: 1,
          icon: 'https://pancakeswap.finance/images/farms/cake-bnb.svg',
          title: 'CAKE-BNB',
          apr: '85.812',
          earn: 'CAKE',
          earned: 0,
          total: '694,471,471',
          link: [
            {
              name: 'google',
              url: 'https://www.google.com',
            },
          ],
        },
        {
          id: 2,
        },
      ],
      skeletonShow: false,
      activeNames: [],
    };
  },
  computed: {
    // skeletonLoading() {
    //   return !(Object.keys(this.data).length && this.skeletonShow);
    // },
  },
  methods: {
    goLink(url) {
      window.location.href = url;
    },
  },
  created() {
    // const that = this;
    // setTimeout(function() {
    //   that.skeletonShow = false;
    // }, 200);
  },
};
</script>

<style lang="less" scoped>
.list {
  margin: 30px 0;
}
.farms-card {
  display: inline-flex;
  width: 100%;
  margin: 15px 0;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;
  border-radius: 6px;
  .title-content {
    margin-bottom: 12px;
    .icon {
      position: relative;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 64px;
      max-width: 64px;
      max-height: 64px;
      width: 100%;
      padding-top: 0%;
      img {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        max-width: 100%;
      }
    }
    .title {
      font-size: 20px;
      margin-bottom: 4px;
      font-weight: bold;
      color: @themeColor;
    }
  }
  .model-pan {
    padding-top: 15px;
    .wallet {
      width: 100%;
      border-radius: 16px;
      margin-top: 8px;
      box-shadow: rgba(14, 14, 44, 0.4) 0px -1px 0px 0px inset;
      font-weight: bold;
      min-height: 48px;
    }
  }
  .solo-title {
    font-weight: 600;
    line-height: 1.5;
    text-transform: uppercase;
    font-size: 12px;
    text-align: left;
    span:first-child {
      color: @themeColor;
      margin-right: 4px;
    }
    span:nth-child(2) {
      color: @deepFontColor;
    }
  }
  .grey-tite {
    font-size: 20px;
    color: rgb(189, 194, 196);
  }
  .gray-butn {
    background-color: rgb(233, 234, 235);
    border-color: rgb(233, 234, 235);
    box-shadow: none;
    color: rgb(189, 194, 196);
    cursor: not-allowed;
    align-items: center;
    border: 0px;
    border-radius: 16px;
    height: 48px;
    padding: 0px 24px;
    outline: 0px;
    transition: background-color 0.2s ease 0s;
    &:hover {
      background-color: rgb(233, 234, 235);
      border-color: rgb(233, 234, 235);
      box-shadow: none;
      color: rgb(189, 194, 196);
    }
  }
  .split-line {
    margin: 20px 0;
    height: 1px;
    background: rgb(233, 234, 235);
  }
  .el-collapse-item {
    border-width: 0;
  }
  .hide-pan {
    min-height: 40px;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    color: @themeColor;
    /deep/.el-collapse-item__header.is-active {
      text-align: center;
      display: inline-block;
    }
    /deep/.el-collapse-item__header {
      display: inline-block;
      color: @deepFontColor;
      font-size: 16px;
      font-weight: 600;
      line-height: 1.5;
    }
    /deep/.el-collapse-item__arrow {
      transform: rotate(-90deg);
    }
    /deep/ .el-collapse-item__arrow.is-active {
      transform: rotate(90deg);
    }
    /deep/.el-collapse-item__wrap {
      background-color: transparent;
      background: transparent;
      border-bottom-width: 0;
    }
    .goLink {
      color: rgb(31, 199, 212);
      font-size: 16px;
      font-weight: 600;
      line-height: 1.5;
      text-align: left;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
.my-skeleton {
  min-width: 120px;
  height: 60px;
  padding: 0;
  .van-skeleton__row {
    width: 100% !important;
    height: 100%;
  }
}
.content-skeleton {
  min-width: 60px;
  height: 25px;
  padding: 0;
  .van-skeleton__row {
    width: 100% !important;
    height: 100%;
  }
}
</style>
