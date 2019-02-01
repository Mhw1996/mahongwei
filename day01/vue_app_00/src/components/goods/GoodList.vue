<template>
<!-- 最外层的父元素 -->
  <div class="app-goodlist">
    <!-- 商品的项目 -->
    <div class="goods-item" v-for="item of list" :key="item.lid">
      <img :src="'http://127.0.0.1:3000/'+item.md" alt="">
      <h6>{{item.title}}</h6>
      <div class="info">
        <span class="now">￥{{item.price.toFixed(2)}}</span>
      </div>
      <div class="sell">
        <span>热卖中</span>
      </div>
    </div>
    <!-- 加载更多 -->
    <mt-button class="" type="primary" size="large" @click="getMore()">加载更多...</mt-button>
  </div>
  
</template>
<script>
export default {
  data(){
    return {
      list:[],
      pno:0,
      pageSize:6 
    }
  },
  methods:{
    // 商品的分页
    getMore(){
      this.pno++;
      var url="http://127.0.0.1:3000";
      url+="/products?pno="+this.pno;
      url+="&pageSize="+this.pageSize;
      this.axios.get(url).then(result=>{
        console.log(result.data)
        // this.list=result.data.data;
        var rows=this.list.concat(result.data.data);
        this.list=rows;
      })
    }
  },
  created(){
    this.getMore()
  }
}
</script>
<style scoped>
/* 外层的父元素 */
.app-goodlist{
  display: flex;
  /* 子元素换行 */
  flex-wrap: wrap;
  /* 两端对齐 */
  justify-content: space-between;
  padding: 4px;
}
/* 商品项 */
.app-goodlist .goods-item{
  width: 49%;
  border: 1px solid rgb(214, 203, 203);
  box-shadow: 0 0 8px #ccc;
  margin: 4px 0;
  padding: 2px;
  /* 子元素也是弹性布局 */
  display: flex;
  flex-direction: column;
  min-height: 230px;
  justify-content: space-between;
}
.app-goodlist .goods-item img{
  width: 100%;
}
.app-goodlist .goods-item .now{
  color:  red;
  font-size:16px;
  font-weight: bold;
}
</style>
