import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入了mint-ui样文件；
import'mint-ui/lib/style.css'

Vue.config.productionTip = false
//引入mui库样式文件九宫格
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
//引入mint-ui组件，header
import {Header,Swipe,SwipeItem,Button} from "mint-ui"
//注册Header组件
//Header.name 的值就是mt-header
Vue.component(Header.name,Header)//注册一个Header组件
Vue.component(Swipe.name,Swipe)//注册一个Swipe，轮播组件
Vue.component(SwipeItem.name,SwipeItem)
Vue.component(Button.name,Button)//注册一个button的组件
//使用axios的方式发送请求，三步！！！
//（1）引入axios库，
import axios from "axios";
//（2）配置跨域访问，保存session信息；
axios.defaults.withCredentials=true;
//（3）将axios库配置到Vue配置vue实例对象中；
Vue.prototype.axios=axios
// (4)加载第三方的模块
import qs from "qs"
// (5)配置qs模块，qs成为Vue属性
Vue.prototype.qs=qs;

//创建一个日期的过滤器
Vue.filter("datetimeFilter",function(val){
  //创建日期对象
  var date=new Date(val);
  //获取年月日，时分秒，
  var y=date.getFullYear(); 
  var m=date.getMonth()+1;
  var d=date.getDate();
  var h=date.getHours();
  var mi=date.getMinutes();
  var s=date.getSeconds();
  //返回字符串y-m-d; h:mi:s
  m<10&&(m="0"+m)
  d<10&&(d="0"+d)
    return `${y}年${m}月${d}日 ${h}时${mi}分${s}秒`
})


Vue.filter("datetime",function(val){
  var date=new Date(val);
  // 获取年月日
  var y=date.getFullYear();
  var m=date.getMonth()+1;
  var d=date.getDate();
  // 返回字符串
  m<10&&(m="0"+m)
  d<10&&(d="0"+d)
  return `${y}年${m}月${d}日`
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
