import Vue from 'vue'
import Router from 'vue-router'
// import HelloContainer from "./components/HelloWorld.vue"
import Exam01 from "./components/Exam01.vue"
import List from "./components/List.vue"
import Home from "./components/tabbar/Home.vue"
import NewsList from "./components/home/NewsList.vue"
import GoodList from "./components/goods/GoodList.vue"
import Newsinfo from "./components/home/Newsinfo.vue"
// import comment from "./components/sub/comment.vue"
import GoodInfo from "./components/goods/GoodInfo.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:"/Home"},
    {path:'/Exam01',component:Exam01},
    {path:'/List',component:List},
    {path:'/Home',component:Home},
    {path:'/NewsList',component:NewsList},
    {path:'/GoodList',component:GoodList},
    {path:'/Newsinfo',component:Newsinfo},
    {path:'/GoodInfo',component:GoodInfo}
    // {path:'/comment',component:comment}
  ]
})
