<template>
  	<div class="app-newsinfo">
			<div class="mui-card">
				<div class="mui-card-header mui-card-media" :style="'height:40vw;background-image:url('+info.img_url+')'"></div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <!-- 定义过滤器2019-01-20 -->
						<p>{{info.ctime|datetime}}</p>
						<p style="color: #333;">{{info.content}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<a class="mui-card-link">Like</a>
					<a class="mui-card-link">Read more</a>
				</div>
			</div>
      <!-- 评论 -->
<!-- // 3.调用子组件 -->
      <comment-box></comment-box> 
</div>
</template>
<script>
// 1；引入子组件
import comment from "../sub/comment.vue"


export default {
  data(){
    return {
      info:{},
      // id1:""
    }
  },
  created(){
    this.getUrl();
    // console.log(this.id1)
  },
  methods:{
    getUrl(){
      var id1=this.$route.query.nid
      var url="http://127.0.0.1:3000";
      url+="/findNewsInfo?id="+id1;
      this.axios.get(url).then(result=>{
          // console.log(result.data)
          this.info=result.data.data[0];
          // console.log(this.info)
      })
    }
  },
  // 2.注册子组件
    components:{"comment-box":comment }
}
</script>
<style scoped>

</style>
