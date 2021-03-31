<!--
 * @Author: lenghui
 * @Description: loading 图标
-->
<template>
  <div class="wrap">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      class="svg"
      :style="{ width: width + 'px', height: height + 'px' }"
    >
      <g
        fill="none"
        :stroke-width="strokeWidth"
        stroke-miterlimit="10"
        stroke="#04c19e"
        style="
          animation: 4s linear 0s infinite normal none running woo-spinner-_-rotate;
          height: 50px;
          transform-origin: center center;
          width: 50px;
        "
      >
        <circle cx="25" cy="25" r="20" opacity=".3"></circle>
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke-dasharray="25,200"
          stroke-linecap="round"
          style="animation: 3s ease-in-out 0s infinite normal none running woo-spinner-_-dash"
        ></circle>
      </g>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    color: {
      type: String,
      default: '#04c19e',
    },
    width: {
      type: Number,
      default: 24,
    },
    height: {
      type: Number,
      default: 24,
    },
    strokeWidth: {
      type: Number,
      default: 5,
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  //   height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  //   background: #fff;
}
.svg {
  //   width: 24px;
  //   height: 24px;
  padding: 0;
}
.text {
  margin-left: 6px;
  color: #777f8e;
  /* font-size: 12px; */
}
</style>
