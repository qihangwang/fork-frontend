<template>
  <div>
    <div v-if="type == 0">
      <div>
        <div class="project">
          <div class="top">
            <div class="top-info">
              <!-- <img src="https://fork-images.oss-cn-hongkong.aliyuncs.com/bcakground_web_4.png" /> -->
              <img src="https://fork-finance.org/ico_lg_1_64@2x.png" />
              <span>FORK</span>
            </div>
            <button class="top-btn" @click="show = !show"><i :class="show ? 'up' : 'down'"></i></button>
          </div>
          <collapse-transition>
            <div class="content" v-show="show">
              <el-row type="flex" class="flex-wrap">
                <el-col class="item" :sm="24" :md="12">
                  <el-card shadow="hover">
                    <div class="type type-1">First</div>
                    <div class="card-wrap">
                      <div class="status-wrap">
                        <div class="times">
                          <span>status:</span>
                          <template>
                            <span class="waiting">waiting</span>
                          </template>
                        </div>
                        <van-count-down :time="30 * 60 * 60 * 24 * 120">
                          <template #default="timeData">
                            <span class="block">{{ timeData.hours }}</span>
                            <span class="colon">:</span>
                            <span class="block">{{ timeData.minutes }}</span>
                            <span class="colon">:</span>
                            <span class="block">{{ timeData.seconds }}</span>
                          </template>
                        </van-count-down>
                      </div>
                      <el-button class="btn" type="primary">Approve</el-button>
                      <ul class="info">
                        <li><span>Total FORK:</span><span>contetn</span></li>
                        <li><span>CHECK deposited:</span><span>contetn</span></li>
                        <li><span>CHECK to burn:</span><span>contetn</span></li>
                        <li><span>CHECK you deposited:</span><span>contetn</span></li>
                        <li><span>FORK you'l receive:</span><span>contetn</span></li>
                      </ul>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
              <div class="close">
                <span @click="show = false">Close<i class="up"></i></span>
              </div>
            </div>
          </collapse-transition>
        </div>
      </div>
      <Model
        :visable="modelVisable"
        :onOk="closeModel"
        :type="modelType"
        :data="activeItem"
        :onCanel="closeModel"
        :onClose="closeModel"
        ref="model"
      />
    </div>
    <div v-if="type == 1" class="no-result">
      <img src="https://fork-images.oss-cn-hongkong.aliyuncs.com/no-result.png" />
      <div>No data temporarily</div>
    </div>
  </div>
</template>
<script>
import CollapseTransition from './collapse-transition';
import contracts from '@/config/contractObj';
import Contract from '@/utils/contract';
import Model from './Model.vue';

export default {
  name: 'CashItem',
  props: {
    type: [Number, String],
  },
  components: {
    Model,
    CollapseTransition,
  },
  data() {
    return {
      show: true,
      skeletonLoading: true,
      contracts,
      poolsLength: 0,
      //modal
      modelType: '',
      modelVisable: false,
      activeItem: {},
      project: [],
    };
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
    renderProject() {
      return this.project.filter(() => {
        if (this.type == 0) {
          return true;
        }
        if (this.type == 1) {
          return true;
        }
        return false;
      });
    },
  },
  watch: {
    chainIdError(status) {
      if (!status) {
        this.init();
      } else {
        this.skeletonLoading = true;
      }
    },
  },
  created() {
    if (!this.chainIdError) {
      this.init();
    }
  },
  methods: {
    async init() {
      this.skeletonLoading = true;
      await this.getPools();
      this.skeletonLoading = false;
    },
    // 1.first getpools, dont need accounts
    async getPools() {
      //   const that = this;
      const current = this.contracts.ForkFarm;
      const contract = new Contract(current.abi, current.address, current.name);
      //   await contract.call('poolLength', false, function(err, res) {
      //     if (!err) {
      //       that.poolsLength = res;
      //       console.log(res, 'res');
      //     }
      //   });
      for (let i = 0; i < 2; i++) {
        await contract.call('cashPoolInfo', 3, function(err, res) {
          if (!err) {
            console.log(res);
          }
        });
      }
    },
    // modal status
    changeModel(type, item) {
      this.modelVisable = true;
      this.modelType = type;
      this.activeItem = item;
    },
    closeModel() {
      this.modelVisable = false;
      this.activeItem = {};
      this.modelType = '';
    },
  },
};
</script>
<style lang="less" scoped>
.flex-wrap {
  flex-wrap: wrap;
}
.project {
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 20%);
}
.top {
  display: flex;
  background: #99e6f0;
  padding: 16px 30px;
  justify-content: center;
  &-info {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
    img {
      width: 40px;
      height: 40px;
      margin-right: 20px;
    }
    span {
      font-size: 20px;
    }
  }
  &-btn {
    margin-left: auto;
    -webkit-box-align: center;
    align-items: center;
    border: 0px;
    border-radius: 16px;
    /* box-shadow: rgb(14 14 44 / 40%) 0px -1px 0px 0px inset; */
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
    height: 48px;
    padding: 0px 24px;
    background-color: rgb(31, 199, 212);
  }
  &-btn:active {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
}
i {
  border: solid #fff;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
}
.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}
.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.content {
  background: rgb(246, 246, 246);
  padding-top: 20px;
}
.item {
  padding: 0 16px;
  margin: 16px 0;
  border-radius: 16px;
  .type {
    line-height: 30px;
    padding: 20px;
    font-size: 20px;
    color: rgb(69, 42, 122);
    font-weight: bold;
  }
  .type-1 {
    background: linear-gradient(rgb(167, 232, 241) 0%, rgb(148, 225, 242) 100%);
  }
  .type-2 {
    background: linear-gradient(rgb(226, 201, 251) 0%, rgb(205, 184, 250) 100%);
  }
  .status-wrap {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    align-items: center;
  }
  .btn {
    width: 100%;
    margin: 20px 0;
  }
  /deep/.el-card {
    height: 100%;
    border-radius: 16px;
    overflow: hidden;
  }
  /deep/.el-card__body {
    padding: 0;
  }
  .card-wrap {
    padding: 20px;
  }
}
.info {
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #452a7a;
    line-height: 1.6;
    font-weight: 400;
    > span:first-child {
      color: rgb(143, 128, 186);
    }
  }
}
.status {
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 12px;
  transform: scale(0.9);
}
.finshed {
  color: #fff;
  background: #607d8b;
  .status;
}
.start {
  background: #03a9f4;
  color: #fff;
  .status;
}
.close {
  background: #99e7f0;
  border-top: 1px solid rgb(233, 234, 235);
  color: #000;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin-top: 30px;
  i {
    border: solid #000;
    border-width: 0 2px 2px 0;
    margin-left: 10px;
    display: inline-block;
    vertical-align: middle;
    margin-top: 2px;
  }
}
.block {
  min-width: 18px;
  height: 18px;
  display: inline-block;
  background: #607d8b;
  color: #fff;
  text-align: center;
  padding: 2px;
  box-sizing: content-box;
  border-radius: 6px;
  font-size: 12px;
}
.btn {
  width: 100%;
  border-radius: 16px;
  margin: 10px;
  box-shadow: rgba(14, 14, 44, 0.4) 0px -1px 0px 0px inset;
  font-weight: bold;
  min-height: 48px;
}
.times {
  display: flex;
  flex-direction: column;
}
.waiting {
  color: #ffc107;
  font-size: 20px;
  font-weight: bold;
}

@media only screen and (max-width: 767px) {
  .item {
    padding: 0 10px;
  }
  .item .type {
    padding: 10px 20px;
  }
}
@media only screen and (max-width: 991px) {
}
@media only screen and (min-width: 992px) {
}
@media only screen and (min-width: 1200px) {
}
</style>
