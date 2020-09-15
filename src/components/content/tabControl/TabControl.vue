<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{active:currentIndex==index}"
      @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      console.log("yyy", index);

      this.$emit("tabClick", index);
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  font-size: 15px;
  z-index: 9;
  height: 40px;
  line-height: 40px;
}
.tab-control-item {
  flex: 1;
  text-align: center;
}

.tab-control-item span {
  padding: 2px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 1px solid var(--color-high-text);
}
</style>