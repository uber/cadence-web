<template>
  <div class="tree">
    <input type="text" v-model="curve" />
    <svg width="500px" height="500px">
      <path fill="none" stroke="yellow" stroke-width="5" :d="d" />
      <circle
        r="10"
        v-for="(item, index) in dataset"
        :cx="item[0]"
        :cy="item[1]"
        :key="index"
        fill="#666600"
        @click="onClick(item)"
      />
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
import dataset from "./data.json";
export default {
  data() {
    return {
      dataset,
      curve: "curveNatural"
    };
  },
  methods: {
    onClick(item) {
      alert(item.id);
    }
  },
  computed: {
    lineGenerator() {
      return d3
        .line()
        .curve(d3[this.curve])
        .x(v => v[0])
        .y(v => v[1]);
    },
    d() {
      return this.lineGenerator(this.dataset);
    }
  }
};
</script>

<style lang="stylus">
div.tree {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>