<template>
  <div class="app-GoodInfo">
    <!-- 1.1卡片布局 -->
  <div class="mui-card">
  <div class="mui-card-content">
    <div class="mui-card-content-inner">
     <!-- 3、调用轮播图子组件 -->
     <!-- :list="rows" 传的是rows这个数组。接收的是list -->
     <swiper-box :list="rows"></swiper-box>
     <!-- 3.1在子组件中添加轮播标签 3.2样式，3.3循环 list-->
    </div>
  </div>
  </div>
    
    <!--1.2 商品信息 -->
      <!-- 商品的名称，价格，数量，添加购物车 -->
      <!-- 1.2.1获取商品的编号，参数 -->
      <!-- GoodList.vue->GoodInfo.vue -->
      <!-- 为每个图片绑定单击事件 -->
      <!-- 1.2.2发送Ajax获取商品的名称 -->
      <!-- 1.2.3显示模板 -->

      <div class="mui-card">
				<div class="mui-card-header">{{info.lname}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>销售价:￥{{info.price}}.00</p>
            <span class="font">购买数量:</span> 
				<div class="mui-numbox">
					<button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodsub() " >-</button>
					<input class="mui-input-numbox" type="number" value="1" v-model="val"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button"  
          @click="goodAdd()">+</button>
				</div>

					</div>
				</div>
				<div class="mui-card-footer">
          <mt-button type="danger" size="small">加入购物车</mt-button>
        </div>
			</div>

    <!--1.3 商品参数 -->
 
  </div>
</template>

<script>
// 1、引入轮播图子组件
import swiperBox from '../sub/swiperBox.vue'
export default {
  data(){
    return {
      rows:[], //创建空数组为了保存子组件显示数据；,
      info:{},  //为保存接收从数据库中获取的数据，价格，名称
      pid:this.$route.query.pid,
      val:'1'
    }
  }, 
  created(){
    this.getImages(),
    this.findGoodInfo()
  },
  methods:{ 
    // 为加号绑定事件
    // getChange(val){
    //     if(this.val<0){this.val++}
    //     if(this.val>0){this.val--}
    // },
    goodAdd(){
      this.val++;
    },
    goodsub(){
      if(this.val>1){this.val=1}
    },
   findGoodInfo(){
      var url="http://127.0.0.1:3000"
      url+="/findProduct?pid="+this.pid;
      this.axios.get(url).then(result=>{
        // console.log(result.data.data[0])
        this.info=result.data.data[0]
      })
    },
    // 父组件从数据库拿出轮播的图片从而传给子组件；
    getImages(){
      var url="http://127.0.0.1:3000/imageList";
      this.axios.get(url).then(result=>{
        // console.log(result)
        this.rows=result.data;
      })
    }
  },
 
// 2、注册轮播子组件
  components:{"swiper-box":swiperBox}
}
</script>
<style scoped>
.font{
  font-size: 18px;
  padding-right: 10px;
}
</style>
