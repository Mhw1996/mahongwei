<template>
<!-- 先创建一个根元素div -->
  <div class="app-exam02">
    <h3>数据列表</h3>
    <ul>
      <!-- 创建一个警告的消息：默认情况下，vue会对数据进行排序的操作，vue制定属性key="存放当前对象的属性"=>key="item.id" -->
      <!-- id的值不能重复， -->
      <li  v-for="item of list" :key="item.id">编号:{{item.lid}}名字:{{item.name}}年领:{{item.age}}</li>
    </ul>
  </div>
</template>
<script>
export default {//组件默认的导出的对象
  data(){//组件用来操作的数据
    return {
      list:[
        {lid:1,name:"tom",age:"19"},
        {lid:2,name:"tom1",age:"21"},
        {lid:3,name:"tom2",age:"22"}
      ]
    }
  }
}
</script>
<style scoped>
  .app-exam02{
    color: red;
    font-size: 16px;
  }
</style>
