<template>
  <div class="fixed">
    <div class="content">
      <h2>Come Soon</h2>
      <van-count-down :time="30 * 60 * 60 * 120">
        <template #default="timeData">
          <div class="inline">
            <span class="block" v-html="timeData.days < 10 ? `0${timeData.days}` : timeData.days"></span>
            <span class="sub">days</span>
          </div>
          <span class="colon">:</span>
          <div class="inline">
            <span class="block" v-html="timeData.hours < 10 ? `0${timeData.hours}` : timeData.hours"></span>
            <span class="sub">hours</span>
          </div>
          <span class="colon">:</span>
          <div class="inline">
            <span class="block" v-html="timeData.minutes < 10 ? `0${timeData.minutes}` : timeData.minutes"></span>
            <span class="sub">minutes</span>
          </div>
          <span class="colon">:</span>
          <div class="inline">
            <span class="block" v-html="timeData.seconds < 10 ? `0${timeData.seconds}` : timeData.seconds"></span>
            <span class="sub">seconds</span>
          </div>
        </template>
      </van-count-down>
    </div>
  </div>
</template>
<style lang="less" scoped>
.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background: #ccc;
}
.content {
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  top: 40%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  h2 {
    font-size: 60px;
    color: #fff;
    font-weight: bold;
    transform: scale(1.5);
  }
}
.inline {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  .sub {
    font-size: 30px;
    margin-top: 20px;
  }
}

/deep/.van-count-down {
  margin: 100px auto;
  font-size: 60px;
  color: #03a9f4;
}
.block {
  display: inline-block;
  background: #dcf4ff;
  padding: 40px 30px;
  border-radius: 20px;
  margin: 0 30px;
}
</style>
