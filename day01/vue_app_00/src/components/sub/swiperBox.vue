<template>
  <div class="app-swiper">
  <mt-swipe :auto="2000" id="">
  <mt-swipe-item v-for="item in list" :key="item.id">
    <img :src="item.img_url" alt="">
  </mt-swipe-item>
  </mt-swipe>
  </div>
</template>
<script>
export default {
  data(){
    return{}
  }, 
  props:["list"]// 接收父组件的数据
}
// 父组件发送一个Ajax请求，返回图片的列表；
// 返回图片列表，将列表传给子组件；
</script>
<style scoped>
  .mint-swipe{
    height: 140px;
  }
  .mint-swipe img{
    width: 100%;
  }
  .app-swiper .mui-card-content .mui-card-content-inner{
    padding:0px !important;
  }
</style>
