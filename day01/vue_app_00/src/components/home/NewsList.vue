
<template>
<div>
<ul class="mui-table-view" >
  <li class="mui-table-view-cell mui-media" v-for="item of news" :key="item.id">
  <router-link :to="'/Newsinfo?nid='+item.id">
      <img class="mui-media-object mui-pull-left" :src="item.img_url">
      <div class="mui-media-body">
        {{item.title}}
        <p>{{item.content}}</p>
        <p class='mui-ellipsis'>
          <span>{{item.ctime |datetimeFilter}} </span>  
          <span>点击{{item.point}}次</span>  
        </p>
      </div>
  </router-link>
  </li>
</ul>
<mt-button class="" type="primary" size="large" @click="getMore()">加载更多...</mt-button>
</div>
</template>
<script>
export default {
  data(){
    return{
      news:[],
      pno:1, //当前的页码；
      pageSize:7 //当前页大小；
    }
  },
  methods: { 
    //加载下一页的数据
    getMore(){
    // console.log("下一页")
      //修改当前的页码加1
      this.pno++;
      // console.log(this.pno)
      // 发送一个get请求
  var url="http://127.0.0.1:3000";
      url+="/newlist?pno="+this.pno;
      url+="&pageSize="+this.pageSize;
      // var url=`http:127.0.0.1:3000/newlist?pno=${this.pno}&pageSize=${this.pageSize}`;
      this.axios.get(url).then(result=>{  
        // 获取下一页数据保存到news中
        // this.news=result.data.data;
        //拼接两个数组
        var rows=this.news.concat(result.data.data);
        //赋值
        this.news=rows;
        // console.log(result.data.data)
      })
    },
    newList(){
      this.axios.get("http://127.0.0.1:3000/newlist").then(result=>{
        // console.log(result)
        this.news=result.data.data
      })
    }
   
  },
  created(){
    // console.log(this.$route.query.nid)
    this.newList()
  }

}
</script>
<style>
  /* 日期和点击的次数两端对齐 */
  .mui-ellipsis{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #226aff;
  }
</style>