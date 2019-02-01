<template>
  <div class="app-comment">
  <div class="mui-card-content">
    <div class="mui-card-content-inner">
      <textarea name=""  v-model="msg" cols="5" rows="3" placeholder="请输入评论内容最多120字..." maxlength="120">
      </textarea>
      <!--  @click="comment" -->
      <mt-button type="primary" size="large" @click="addcomment">发表评论</mt-button>
      <div class="mui-card">
    </div>
    </div>
    <div class="mui-card-footer">
      <div class="cmt-list">
        <div class="cmt-item" v-for="(item,i) of list" :key="item.id">
          <div><span class="ctm-col">第{{i+1}}楼</span> 发表时间：{{item.ctime|datetimeFilter }}</div>
          <div class="cmt-com1"> {{item.content}}</div>
        </div>
      </div>
    </div>
    <mt-button class="" @click="getMore">加载更多...</mt-button>
    </div>
  </div>
</template>
<script>
// 在当前的 comment.vue 单独引入提示组件
import {Toast} from "mint-ui"
export default {
  data(){
    return{
      list:[],
      pno:0,
      pageSize:5,
      nid:5,
      // content:"",
      msg:""//双向绑定评论的内容，默认为空的字符串
    }
  },
  methods:{
    getMore(){
      this.pno++;
      var url="http://127.0.0.1:3000";
      url+="/getComment?pno="+this.pno;
      url+="&pageSize="+this.pageSize;
      url+="&nid="+this.nid
      this.axios.get(url).then(result=>{
        // console.log(result.data)
       var rows=this.list.concat(result.data.data);
       this.list=rows
      })
    },
    //get请求写的评论
    /*
    comment(){
      var p=this.com;
      if(p==""){alert("内容不能为空")}else{
      // console.log(p)
      var url="http://127.0.0.1:3000";
      url+="/comment?p="+this.com;
      this.axios.get(url).then(result=>{
        console.log(result)
      })
      history.go(0)
      }
    }*/
  //post请求发送的评论
  addcomment(){
    //1:创建参数对象，postData 测试
    // 4].获取当前新闻nid
    var nid=this.$route.query.nid;
    // stringify 将js对象转化为查询字符串
    var postData=this.qs.stringify({
        nid:this.nid,
        content:this.msg
    });
    // 练习
      // 1].为为添加评论点击绑定事件
      // 2].获取评论的内容
      // 3].判断评论内容不能为空
      // 5].发送ajax
  var m=this.msg;
      //trim()去除字符串两端的空格
  var size=m.trim().length;
      if(size==0){
        Toast("评论内容不能为空");
        return;
      }
  var url="http://127.0.0.1:3000/";
      url+="addcomment";
      this.axios.post(url,postData).then(result=>{
        console.log(result.data.code)
        // 1:提示评论成功          
        Toast(result.data.msg)
        // 2：清空评论区域的内容
        this.msg="";
      });
        

  }
  },
  created(){
    this.getMore()
    // this.addcomment()
  }
}
</script>
<style scoped>
  .ctm-col{
    color: brown;
  }
  .cmt-com1{
    color: rgb(6, 20, 223);
  }
</style>

