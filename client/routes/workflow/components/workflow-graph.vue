<template>
<div class="tree">
<svg height="100" width="100">
  <circle cx="50" cy="50" r="40" fill="#666600"/>
  </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
  export default {
    data() {
      return {
        a: 0,
        b: 0,
        reduced: 0
      }
    },
    computed: {
      c() {
        return this.a + this.b;
      }
    },
    watch: {
      c(val) {
        this.reduced = val
        this.subtract()
      }
    },
    methods: {
subtract(){
  this.reduced -= .1
  if(this.reduced > .001) {
    requestAnimationFrame(this.subtract)
  }
  else {
    this.reduced = 0;
  }
}
    }

  }
</script>

<style lang="stylus">
div.tree
   flex 1
   display flex
   justify-content center
   align-items center
</style>