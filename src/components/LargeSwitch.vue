<template>
  <div class="fork-switch" @click="getTarget">
    <span
      v-for="(item, index) of textArr"
      :key="index"
      :class="{ selected: value == index }"
      :dataValue="index"
      v-html="textArr[index]"
    ></span>
    <!-- <span :class="{ selected: value - 0 != 0 }" :dataValue="1">{{ textArr[1] }}</span> -->
  </div>
</template>

<script>
export default {
  name: 'LargeSwitch',
  props: {
    value: [Number, String],
    textArr: {
      type: Array,
      default: function() {
        return ['   Live   ', 'Finished'];
      },
    },
  },
  methods: {
    getTarget(e) {
      const ele = e.target;
      return this.$emit('update:value', ele.getAttribute('dataValue'));
    },
  },
};
</script>

<style lang="less" scoped>
.fork-switch {
  display: inline-block;
  border-radius: 30px;
  font-size: 16px;
  line-height: 40px;
  color: @themeColor;
  background-color: #d1e1ec;
  span {
    display: inline-block;
    height: 100%;
    padding: 0 12px;
    cursor: pointer;
    font-weight: bold;
    border-radius: 16px;
    white-space: break-spaces;
    &:hover {
      opacity: 0.9;
    }
  }
  .selected {
    color: #fff;
    text-align: center;
    font-size: 16px;
    background: @themeColor;
    box-shadow: rgba(3, 32, 64, 0.4) 0px -2px 0px 0px inset;
  }
}
@media only screen and (max-width: 992px) {
  .fork-switch {
    line-height: 30px;
  }
}
</style>
