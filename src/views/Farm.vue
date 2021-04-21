<template>
  <div class="container">
    <Summary />
    <div class="card">
      <LargeSwitch :value.sync="SwitchState" />
      <FarmsList :type="SwitchState" />
    </div>
  </div>
</template>
<script>
import Summary from '@/components/RewardSummary';
import LargeSwitch from '@/components/LargeSwitch';
import FarmsList from '@/components/FarmsList';
export default {
  name: 'Farm',
  components: { Summary, FarmsList, LargeSwitch },
  data() {
    return {
      SwitchState: 0,
    };
  },
};
</script>
<style lang="less" scoped>
// .list {
//   margin-top: 30px;
// }
</style>
