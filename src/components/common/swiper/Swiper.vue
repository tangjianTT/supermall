<template>
  <div class="block">
    <el-carousel height="200px" :interval="2000">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <a class="small" :href="item.link">
          <img :src="item.image" alt />
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    banners: Array
  },
  data() {
    return {
      startPointX: null
    };
  }
};
</script>

<style  scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.small img {
  width: 100%;
  height: 100%;
}
</style>
  
