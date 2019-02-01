<template>
<!-- 先创建一个根元素div -->
  <div class="app-exam01">
    <h3>练习的组件创建</h3>
    <h5 @click="jump1"> 跳转到新闻的组件</h5>
    <h4 @click="jump2">跳转到商品列表的组件</h4>
    <h3 @click="jump3">组件之间的跳转到新闻带参</h3>
  </div>
</template>
<script>
export default {//组件默认的导出的对象
  data(){//组件用来操作的数据
    return {}
  },
  methods:{
    jump1(){
      this.$router.push("/NewsList")
    },
    jump2(){
      this.$router.push("/GoodList")
    },
    jump3(){
      this.$router.push("/NewsList?nid=6")
    }
  }
}
</script>
<style scoped>
  .app-exam01{
    color: red;
    font-size: 16px;
  }
</style>
