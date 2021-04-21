<template>
  <div class="container">
    <div class="top card">
      <h2 class="top-title">IFO: Initial Farm Offerings</h2>
      <p class="top-desc">Buy new tokens with a brand new token sale model.</p>
    </div>
    <div class="card con">
      <LargeSwitch :value.sync="SwitchState" :textArr="['OTG  IDFO', 'Past IDFO']" />
      <el-divider></el-divider>
      <CashList :type="SwitchState" />
    </div>
  </div>
</template>
<script>
import LargeSwitch from '@/components/LargeSwitch';
import CashList from '@/components/CashList';
export default {
  name: 'Cash',
  components: { LargeSwitch, CashList },
  data() {
    return {
      SwitchState: 0,
    };
  },
};
</script>
<style lang="less" scoped>
.top {
  &-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &-desc {
    color: #607d8b;
  }
}
.con {
  margin-top: 30px;
  min-height: 750px;
}
@media only screen and (max-width: 767px) {
}
@media only screen and (max-width: 991px) {
}
@media only screen and (min-width: 992px) {
}
@media only screen and (min-width: 1200px) {
}
</style>
