<template>
  <div >
      <!-- 顶部的导航条 -->
      <!-- <mt-header fixed title="学子商城"></mt-header> -->
      <!-- 轮播图 -->
      <mt-swipe :auto="2000" id="ex01">
        <mt-swipe-item v-for="item of list"  :key="item.id">
          <img :src="item.img_url" alt="">
        </mt-swipe-item>
    </mt-swipe>
      <!-- 九宫格 -->
<div class="mui-content">
<ul class="mui-table-view mui-grid-view mui-grid-9">
  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
    <router-link to="/NewsList">
          <img src="../../img/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
    </router-link>
    </li>
  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
    <router-link to="/GoodList">
        <img src="../../img/menu2.png" alt="">
        <div class="mui-media-body">商品</div>
    </router-link>
  </li>
  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
    <a href="#">
        <img src="../../img/menu3.png" alt="">
        <div class="mui-media-body">Chat</div>
    </a>
  </li>
  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
    <a href="#">
          <img src="../../img/menu4.png" alt="">
        <div class="mui-media-body">location</div>
    </a>
  </li>
  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
    <a href="#">
        <img src="../../img/menu5.png" alt="">
        <div class="mui-media-body">Search</div>
    </a>
  </li>
  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
    <a href="#">
        <img src="../../img/menu6.png" alt="">
        <div class="mui-media-body">Phone</div>
    </a>
  </li>

</ul> 
</div>
      <!-- tabbar -->
<!-- <nav class="mui-bar mui-bar-tab">
<a class="mui-tab-item mui-active" href="#tabbar">
  <span class="mui-icon mui-icon-home"></span>
  <span class="mui-tab-label">首页</span>
</a>
<a class="mui-tab-item" href="#tabbar-with-chat">
  <span class="mui-icon mui-icon-contact"><span class="mui-badge">0</span></span>
  <span class="mui-tab-label">消息</span>
</a>
<a class="mui-tab-item" href="#tabbar-with-contact">
  <span class=" mui-icon mui-icon-extra mui-icon-extra-cart">
    <span class="mui-badge">0</span>
  </span>
  <span class="mui-tab-label">购物车</span>
</a>
<a class="mui-tab-item" href="#tabbar-with-map">
  <span class="mui-icon mui-icon-search"></span>
  <span class="mui-tab-label">搜索</span>
</a>
</nav> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      list:[]
    }
  },
  methods:{
    handleImage(){
      // 1.发送Ajax请求给服务器，
      this.axios.get("http://127.0.0.1:3000/imageList").then(result=>{
        console.log(result)
        this.list=result.data;
        console.log(result.data)
      })
      //2.接受服务器返回结果
      //3.将结果保存到list中
    }
  },
  created(){
    this.handleImage()
  }
}
</script>
<style scoped>

/* 轮播图 */
.mint-swipe{
  height: 150px;
}
.mint-swipe img{
  width: 100%;
}
/* 九宫格 */
.mui-grid-9 img{
  width: 60px;
  height: 60px;
}
.mui-grid-view.mui-grid-9{
  background: white !important;
}
.mui-content > .mui-table-view:first-child{
  margin-top: 0px !important
}
</style>
