<template>
  <div>
    <div class="wrap">
      <div class="content">
        <img src="https://fork-images.oss-cn-hongkong.aliyuncs.com/fork/header1.png" />
        <van-swipe class="text-wrap" height="100" vertical autoplay="4000" :show-indicators="false">
          <van-swipe-item class="item">
            <h2>
              Fork Finance<br />
              Yield Farming
            </h2></van-swipe-item
          >
          <van-swipe-item class="item">
            <h3>
              Staking LP to<br />
              Earn CHECK Token
            </h3></van-swipe-item
          >
          <van-swipe-item class="item">
            <h3>8X Bonus Period for <br />the First two Weeks</h3></van-swipe-item
          >
        </van-swipe>

        <van-count-down :time="timestamp" @finish="finshedFn" v-if="loaded">
          <template #default="timeData">
            <div>
              <div class="inline">
                <span class="block" v-html="timeData.days < 10 ? `0${timeData.days}` : timeData.days"></span>
                <span class="sub">DAYS</span>
              </div>
              <span class="colon"></span>
            </div>
            <div>
              <div class="inline">
                <span class="block" v-html="timeData.hours < 10 ? `0${timeData.hours}` : timeData.hours"></span>
                <span class="sub">HOURS</span>
              </div>
              <span class="colon"></span>
            </div>
            <div>
              <div class="inline">
                <span class="block" v-html="timeData.minutes < 10 ? `0${timeData.minutes}` : timeData.minutes"></span>
                <span class="sub">MINS</span>
              </div>
              <span class="colon"></span>
            </div>
            <div>
              <div class="inline">
                <span class="block" v-html="timeData.seconds < 10 ? `0${timeData.seconds}` : timeData.seconds"></span>
                <span class="sub">SECONDS</span>
              </div>
            </div>
          </template>
        </van-count-down>
        <p class="text-box">OUR WEBSITE IS COMING SOON</p>
        <el-button v-if="finshed && loaded" @click="linkTo" type="success" icon="el-icon-right" circle></el-button>
        <div class="footer" v-shiw="loaded">
          <p>© 2021 — Made with <span class="love"> ♥︎ </span> by <a href="#">Finance</a></p>
        </div>
      </div>
    </div>
    <div class="over-lay" />
  </div>
</template>
<script>
import Vue from 'vue';
import { Swipe, SwipeItem, NoticeBar } from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(NoticeBar);

export default {
  name: 'CountFown',
  data() {
    return {
      timestamp: 0,
      loaded: false,
      finshed: false,
    };
  },
  async created() {
    await this.getCurrentTime();
    this.loaded = true;
  },
  methods: {
    async getCurrentTime() {
      let time = await web3js.eth.getBlock('latest');
      const end = new Date('2021-04-24T12:00:00.000+0000').getTime();
      this.timestamp = end - time.timestamp * 1000 < 0 ? 0 : end - time.timestamp * 1000;
    },
    finshedFn() {
      this.finshed = true;
    },
    linkTo() {
      this.$router.push('/farm');
    },
  },
};
</script>
<style lang="less" scoped>
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
.text-wrap {
  height: 100px;
  overflow: hidden;
}
.item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.over-lay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: #fff;
  background-size: 100% 100%;
}
.text-box {
  color: #fff;
  margin-top: 10px;
  margin-bottom: 30px;
  text-align: center;
}
.footer {
  color: #fff;
  text-align: center;
  font-size: 14px;
  position: fixed;
  bottom: 30px;
  left: 0px;
  z-index: 1;
  width: 100%;
  ul {
    display: inline-flex;
    margin: 10px auto;
    li {
      margin: 0 10px;
    }
  }
  img {
    width: 40px;
  }
}
.love {
  color: red;
}
.wrap {
  position: fixed;
  overflow: scroll;
  min-height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100000;
  background: url('https://fork-images.oss-cn-hongkong.aliyuncs.com/fork/Desert.jpg') no-repeat;
  background-size: 100% 100%;
}
.content {
  position: absolute;
  //   transform: translateY(-50%);
  top: 10vh;
  //   left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  width: 100%;
  z-index: 1001;
  > img {
    width: 100px;
    height: 100px;
  }
  h2 {
    font-size: 34px;
    letter-spacing: 1px;
    text-align: center;
  }
  h3 {
    font-size: 30px;
    text-align: center;
    letter-spacing: 1px;
  }
}

/deep/.van-count-down {
  margin: 0 auto 40px;

  color: #fff;
  display: flex;
  > div {
    display: flex;
  }
  .colon {
    border-right: 1px dashed #ffffff;
    height: 70%;
  }
}

.inline {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  .block {
    display: inline-block;
    padding: 0 30px;
    border-radius: 20px;
    // font-weight: 100;
    font-size: 40px;
    line-height: 1em;
    font-family: 'element-icons';
  }
  .sub {
    font-size: 14px;
    margin-top: 10px;
    text-transform: uppercase;
    color: #ffffff;
    /* font-size: 0.8em; */
    font-weight: 100;
  }
}

@media only screen and (max-width: 991px) {
  .inline {
    .block {
      padding: 20px;
      margin: 0 20px;
      font-size: 30px;
    }
    .sub {
      font-size: 14px;
    }
  }
  .content {
    padding: 0 16px;
    top: 20vh;
    h2 {
      font-size: 40px;
    }
    h3 {
      font-size: 36px;
    }
  }
}
@media only screen and (max-width: 767px) {
  .inline {
    .block {
      padding: 10px;
      margin: 0 10px;
      font-size: 20px;
    }
    .sub {
      font-size: 12px;
      transform: scale(0.8);
    }
  }
  .footer {
    font-size: 13px;
  }
  .content {
    padding: 0 16px;
    top: 10vh;
    h2 {
      font-size: 30px;
    }
    h3 {
      font-size: 24px;
    }
  }
}
@media only screen and (min-width: 992px) {
}
@media only screen and (min-width: 1200px) {
}
</style>
