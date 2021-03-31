import Vue from 'vue';

Vue.directive('InputMax', {
  inserted: function(el, binding, vnode) {
    // console.log(el, binding, vnode);
    let ele = el.tagName === 'INPUT' ? el : el.querySelector('input');

    ele.oninput = function(event) {
      let maxVal = binding.value;
      console.log(ele.value, event.target.value, binding, vnode);
      if (ele.value >= maxVal) {
        // ele.value = maxVal;
        // vnode.context.val = maxVal;
        // console.log(event.target.value)
        event.target.value = maxVal;
        vnode.componentInstance.handleChange(event);
        // this.$emit('change',maxVal);
      }
    };
  },
  //   bind(el, binding, vnode) {
  //   let maxVal = binding.value;
  //   let ele = el.tagName === 'INPUT' ? el : el.querySelector('input');
  // el.oninput = function() {
  //   if ( ele.value >= maxVal) {
  //     ele.value = maxVal;
  //     // ele.value = maxVal;
  //     // el.value = maxVal;
  //     vnode.componentInstance.clear;
  //   }
  // };
  //   },
});
