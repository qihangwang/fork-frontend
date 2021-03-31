<template>
  <div>
    <div class="section-1">
      <div class="banner">
        <h2 class="hidden-xs-only">
          Leverage yield farming <br />
          the people, for the people
        </h2>
        <h2 class="hidden-sm-and-up">
          Leverage yield <br />farming the people, <br />
          for the people
        </h2>
        <p>Let this majestic South American mammal take your yield to a new height</p>
        <div class="btn-group">
          <el-button type="success" plain size="medium" @click="linkTo('/stake')">Use Alpaca</el-button>
          <a href="https://docs.fork-finance.org/" target="_blank">
            <el-button type="success" plain size="medium">
              Documentation
            </el-button>
          </a>
          <el-button type="success" plain size="medium">FAQs</el-button>
        </div>
      </div>
    </div>
    <div class="section-2">
      <el-row class="section-con">
        <el-col :xs="24" :sm="8">
          <div class="img-box">
            <img src="https://www.alpacafinance.org/assets/images/team.svg" />
            <h4>Community<br />owned</h4>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8">
          <div class="img-box">
            <img src="https://www.alpacafinance.org/assets/images/team.svg" />
            <h4>Community</h4>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8">
          <div class="img-box">
            <img src="https://www.alpacafinance.org/assets/images/team.svg" />
            <h4>Community</h4>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="section-3">
      <h2>Learn more about <span class="green bold">Alpaca Finance</span></h2>
      <el-row class="section-con">
        <el-col :xs="24" :sm="8">
          <div class="box-card">
            <img src="https://www.alpacafinance.org/assets/images/team.svg" />
            <h4>Community</h4>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8">
          <div class="box-card">
            <img src="https://www.alpacafinance.org/assets/images/team.svg" />
            <h4>Community</h4>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8">
          <div class="box-card">
            <img src="https://www.alpacafinance.org/assets/images/team.svg" />
            <h4>Community</h4>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- //4 -->
    <div class="section-4">
      <h2>Join our community</h2>
      <el-row class="section-con">
        <el-col :xs="12" :sm="6">
          <div class="box-card">
            <img src="https://www.alpacafinance.org/assets/images/team.svg" />
            <h4>Medium</h4>
            <p>Follow @AlpacaFinance for the latest update and news</p>
          </div>
        </el-col>
        <el-col :xs="12" :sm="6">
          <div class="box-card">
            <img src="https://www.alpacafinance.org/assets/images/team.svg" />
            <h4>Medium</h4>
            <p>Follow @AlpacaFinance for the latest update and news</p>
          </div>
        </el-col>
        <el-col :xs="12" :sm="6">
          <div class="box-card">
            <img src="https://www.alpacafinance.org/assets/images/team.svg" />
            <h4>Medium</h4>
            <p>Follow @AlpacaFinance for the latest update and news</p>
          </div>
        </el-col>
        <el-col :xs="12" :sm="6">
          <div class="box-card">
            <img src="https://www.alpacafinance.org/assets/images/team.svg" />
            <h4>Medium</h4>
            <p>Follow @AlpacaFinance for the latest update and news</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="section-5">
      <h2>Frequently asked questions</h2>
      <Faqs class="section-con" />
    </div>
  </div>
</template>
<script>
import Faqs from '@/components/Faqs';
export default {
  name: 'Home',
  components: {
    Faqs,
  },
  methods: {
    linkTo(str) {
      this.$router.push({ path: str });
    },
  },
};
</script>
<style lang="less" scoped>
.section-con {
  max-width: 1220px;
  margin: 0 auto;
}
.section-1 {
  min-height: 90vh;
  display: inline-flex;
  background: url(https://www.alpacafinance.org/assets/images/bgnew.svg);
  background-size: 100%;
  background-position: bottom center;
  background-repeat: no-repeat;
  width: 100%;
  .banner {
    width: 100%;
    align-self: center;
    padding: 0 15px;
    margin-top: -100px;
  }
  p {
    margin: 35px 0;
    text-align: center;
    opacity: 0.7;
  }
  .btn-group {
    text-align: center;
    button {
      font-size: 18px;
    }
  }
}
.section-2 {
  padding: 70px 0 50px;
  h4 {
    font-weight: 600;
    line-height: 1.45;
    font-size: 24px;
  }
}
.img-box {
  text-align: center;
  margin-bottom: 20px;
  img {
    width: 300px;
    padding: 60px;
    background: #f6f4f5;
    border-radius: 50%;
    margin-bottom: 10px;
  }
}
h2 {
  font-size: 44px;
  font-weight: 500;
  text-align: center;
  line-height: 1.35;
  letter-spacing: 2px;
}
.box-card {
  text-align: center;
  background: #ffffff;
  padding: 40px 20px;
  box-shadow: 0px 8px 22px -6px rgba(24, 39, 75, 12%), 0px 14px 64px -4px rgba(24, 39, 75, 12%);
  border-radius: 10px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
}
.section-4 {
  .box-card:hover {
    background: #ffffff;
    border: 2px solid @themeColor;
    box-sizing: border-box;
    box-shadow: 0px 8px 22px -6px rgba(24, 39, 75, 12%), 0px 14px 64px -4px rgba(24, 39, 75, 12%);
    border-radius: 10px;
  }
}
.section-3 {
  padding: 70px 10px;
  background: #f4f4f4;
  .box-card {
    margin: 0 40px;
  }
  h2 {
    margin-bottom: 60px;
  }
  h4 {
    font-size: 24px;
    color: @themeColor;
    margin-top: 40px;
    font-weight: 600;
  }
  img {
    width: 146px;
    height: 146px;
  }
}
.section-4 {
  padding: 70px 10px;
  background: #fff;
  .box-card {
    margin: 0 20px;
    box-shadow: none;
    background: #f6f4f5;
  }
  img {
    width: 70px;
    height: 70px;
  }
  h2 {
    margin-bottom: 60px;
  }
  h4 {
    font-size: 24px;
    margin-top: 40px;
    font-weight: 600;
  }
}
.section-5 {
  padding: 70px 20px;
  background: #f4f4f4;
  h2 {
    margin-bottom: 60px;
  }
}

@media only screen and (max-width: 1024px) {
  .img-box img {
    width: 200px;
    padding: 35px;
  }
  .section-3 .box-card {
    margin: 0 20px;
  }
}
@media only screen and (max-width: 767px) {
  h2 {
    font-size: 28px;
  }
  .banner {
    h2 {
      font-size: 4.5vw;
    }
    p {
      font-size: 16px;
    }
  }
  .btn-group button {
    width: 80%;
    margin-bottom: 10px;
    margin-left: 0;
    font-size: 18px;
  }
  .section-3 {
    .box-card {
      margin: 16px 20px;
    }
  }
  .section-4 {
    .box-card {
      margin: 10px;
    }
  }
}
@media only screen and (max-width: 480px) {
  .banner p,
  p {
    font-size: 13px;
  }
}
</style>
