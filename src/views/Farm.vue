<template>
  <div class="container">
    <div class="card con">
      <LargeSwitch :value.sync="SwitchState"/>
      <el-row :gutter="15" type="flex" justify="start" class="farms-list">
        <el-col v-for="item in FarmsList" :key="item.id" :xs="24" :sm="12" :lg="8" :xl="6">
          <!-- 这里是组件 -->
          <div class="base-card">
            <FarmsCard :data="item"/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import LargeSwitch from '@/components/LargeSwitch';
import FarmsCard from '@/components/farms/FarmsCard';
export default {
  name: 'Farm',
  components: { FarmsCard, LargeSwitch },
  data () {
    return {
      SwitchState: 0,
      FarmsList: [{
        id: 1,
        icon: 'https://pancakeswap.finance/images/farms/cake-bnb.svg',
        title: 'CAKE-BNB',
        apr: '85.812',
        earn: 'CAKE',
        earned: 0,
        total: '694,471,471',
        link: [{
          name: 'google',
          url: 'https://www.google.com'
        }]
      }, {
        id: 2
      }]
    }
  },
  methods: {
  }
};
</script>
<style lang="less" scoped>
.con {
  .farms-list{
    display: flex;
    padding: 20px 0;
    flex-wrap: wrap;
    .base-card {
      /*background: #99a9bf;*/
      min-width: 300px;
      border-radius: 4px;
      min-height: 36px;
      text-align: center;
      line-height: 1;
      /*padding: 15px;*/
    }
  }
}
</style>
