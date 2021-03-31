<!--
 * @Author: lenghui
 * @Description: 移动端和pc端 earn界面lengs pools 需要和钱包交互
-->
<template>
  <div>
    <div class="card mobile-earn hidden-md-and-up">
      <p>Available lending pools</p>
      <van-skeleton :row="6" class="m-skeleton mobile-skeleton" :loading="skeletonLoading">
        <template>
          <div class="con" v-for="(item, i) in data" :key="i">
            <div class="type">
              <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png" />
              <span class="gray">{{ item.name }}</span>
            </div>
            <div class="line">
              <span class="gray">Total Supply</span>
              <span>{{ item.total }}</span>
            </div>
            <div class="line">
              <span class="gray">Your Balance</span>
              <div class="cloumn">
                <span>{{ item.iblance }} {{ item.name }}</span>
                <span>{{ item.blance }} {{ item.name }}</span>
              </div>
            </div>
            <el-row :gutter="20" class="btn-group">
              <el-col :sm="12" :xs="12">
                <el-button type="success" plain size="medium" class="mobile-btn" @click="goEarnInfo(item, 'deposit')"
                  >Deposit</el-button
                >
              </el-col>
              <el-col :sm="12" :xs="12">
                <el-button type="success" plain size="medium" class="mobile-btn" @click="goEarnInfo(item, 'withdraw')"
                  >Withdraw</el-button
                >
              </el-col>
            </el-row>
          </div>
        </template>
      </van-skeleton>
    </div>
    <div class="card pc-earn hidden-sm-and-down">
      <p>Available lending pools</p>
      <van-skeleton :row="5" class="m-skeleton" :loading="skeletonLoading">
        <el-table :data="data" border style="width: 100%">
          <el-table-column fixed prop="date" width="150">
            <template slot-scope="scope">
              <div class="td">
                <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png" />
                <span>{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label-class-name="total-text" prop="total" label="Total Supply" min-width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.total }} {{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="blance" label="Your Balance" width="300">
            <template slot-scope="scope">
              <div class="row">
                <span>{{ scope.row.iblance }} i{{ scope.row.name }}</span>
                <span>{{ scope.row.blance }} {{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="200">
            <template slot-scope="scope">
              <div class="btns">
                <el-button
                  @click="goEarnInfo(scope.row, 'deposit')"
                  type="success"
                  plain
                  size="medium"
                  class="mobile-wallet"
                  :disabled="account == ''"
                  >Deposit</el-button
                >
                <el-button
                  @click="goEarnInfo(scope.row, 'withdraw')"
                  type="success"
                  plain
                  size="medium"
                  class="mobile-wallet"
                  :disabled="account == ''"
                  >Withdraw</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </van-skeleton>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PoolTable',
  props: {
    data: Array,
    skeletonLoading: Boolean,
  },
  methods: {
    goEarnInfo(row, type) {
      console.log(row);
      this.$router.push({ path: `/earn/${row.name}/${type}` });
    },
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.mobile-skeleton {
  margin-top: 20px;
}
.cloumn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
.mobile-earn {
  margin-top: 30px;
  p {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .con {
    border-bottom: 1px solid #eee;
    padding: 30px 0 10px;
  }
  .line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .type {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 14px;
    margin-bottom: 30px;
    img {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
  }
  .mobile-btn {
    width: 100%;
  }
  .btn-group {
    padding: 10px 0;
  }
}
.pc-earn {
  margin-top: 30px;
  p {
    text-align: left;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 0.5px;
    margin-bottom: 20px;
  }
  .td {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    span {
      font-size: 20px;
      font-weight: bold;
      color: #333;
    }
  }
  .btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    button {
      width: 90%;
      margin-left: 0;
      margin-bottom: 10px;
    }
  }
  .total-text {
    font-size: 20px;
  }
}
.row {
  display: flex;
  flex-direction: column;
}
</style>
