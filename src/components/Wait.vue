<template>
  <div class="wait">
    <div class="con">
      <div class="ant-img">
        <img src="https://img.bee-cdn.com/large/3b9ae203lz1gonu6yvykvj20e80e8tbi.jpg" />
      </div>
      <p>Not yet open, please wait patiently!</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.wait {
  width: 100%;
}
.con {
  background: #fff;
  .ant-img {
    margin-top: 80px;
    img {
      width: 160px;
      height: 160px;
      margin: 0 auto;
      display: block;
      animation: bounce 1.5s infinite;
    }
  }
  p {
    font-size: 20px;
    text-align: center;
    padding: 40px 0;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }

  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
