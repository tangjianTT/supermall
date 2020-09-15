<template>
  <div id="home">
    <!-- 头部 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <swiper :banners="banners"></swiper>
      <!-- 推荐 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周流行 -->
      <feature-view></feature-view>
      <!-- 标题栏 -->
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></tab-control>
      <!-- 商品列表 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 返回顶部 -->
    <!-- 监听组件内的事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Swiper from "components/common/swiper/Swiper";
import Scroll from "components/common/scroll/Scroll";

import RecommendView from "views/home/childComps/RecommendView";
import FeatureView from "views/home/childComps/FeatureView";

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      titles: [],
      goods: {
        pop: { page: 0, list: [] },
        news: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      type: "pop",
      isShowBackTop: false
    };
  },
  components: {
    NavBar,
    Swiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("news");
    this.getHomeGoods("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.type].list;
    }
  },
  methods: {
    /*
      网络请求相关代码
    */
    // 1.请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log("-----home----", res);
        // this.result=res;
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },

    // 2.请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page)
        .then(res => {
          console.log("-----type----", res);
          console.log(res.data.data[type].list);

          this.goods[type].list.push(...res.data.data[type].list);
          this.goods[type].page += 1;
          this.$refs.scroll.finishPullUp();
        })
        .catch(err => console.log(err));
    },

    /*
      事件监听相关代码
    */
    tabClick(index) {
      this.type = index == 0 ? "pop" : index == 1 ? "news" : "sell";
    },
    backClick() {
      // 滚到顶部
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      console.log(position.y);
      this.isShowBackTop = position.y < -1000;
    },
    loadMore() {
      console.log("xxxxx");
      this.getHomeGoods(this.type);
      this.$refs.scroll.refresh();
    }
  }
};
</script>

<style  scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  background-color: #fff;
}
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
