<template>
  <div class="container">
    <div class="card">
      <LargeSwitch :value.sync="SwitchState" />
      <FarmsCard :type="SwitchState" />
      <!-- <div class="list">
        <van-skeleton :row="8" class="m-skeleton skeleton" :loading="true">
          <el-row :gutter="20">
            <el-col v-for="item in FarmsList" :key="item.id" :md="12" :sm="24">
              <div class="base-card">
                <FarmsCard :data="item" />
              </div>
            </el-col>
          </el-row>
        </van-skeleton>
      </div> -->
    </div>
  </div>
</template>
<script>
import LargeSwitch from '@/components/LargeSwitch';
import FarmsCard from '@/components/FarmsCard';
export default {
  name: 'Farm',
  components: { FarmsCard, LargeSwitch },
  data() {
    return {
      SwitchState: 0,
      FarmsList: [
        // {
        //   id: 1,
        //   icon: 'https://pancakeswap.finance/images/farms/cake-bnb.svg',
        //   title: 'CAKE-BNB',
        //   apr: '85.812',
        //   earn: 'CAKE',
        //   earned: 0,
        //   total: '694,471,471',
        //   link: [
        //     {
        //       name: 'google',
        //       url: 'https://www.google.com',
        //     },
        //   ],
        // },
        // {
        //   id: 2,
        // },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
// .list {
//   margin-top: 30px;
// }
</style>
