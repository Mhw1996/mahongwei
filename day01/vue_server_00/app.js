//app.js
//1:加载模块 express pool.js
const express = require("express");
const pool = require("./pool");

//2:创建服务器端对象
var app = express();
//3:监听 3000
app.listen(3000,()=>{
  console.log("服务器创建成功")
});
//4:指定静态目录  public 
app.use(express.static("public"));
//引入cros进行跨域请求
const cors=require("cors")
//配置跨域访问模块，哪个域名跨域访问允许
//脚手架8080允许；
//origin:指允许跨域访问域名的列表；
//credentials跨域访问保存session id
app.use(cors({
  origin:["http://127.0.0.1:8080","http://localhost:8080"],
  credentials:true
}))
// 7.1、引入模块body-parser
const bodyParser=require("body-parser");
// 8.1、配置对特殊的就json是否自动转换 ->不转换
app.use(bodyParser.urlencoded({extended:false}))

//功能一:home 组件轮播图片
app.get("/imageList",(req,res)=>{
   //1:将轮播图中所需图片 复制public/img
   //2:查询
   var list = [
     {id:1,img_url:"http://127.0.0.1:3000/img/banner1.png"},
     {id:2,img_url:"http://127.0.0.1:3000/img/banner2.png"},
     {id:3,img_url:"http://127.0.0.1:3000/img/banner3.png"},
     {id:4,img_url:"http://127.0.0.1:3000/img/banner4.png"},
   ];
   res.send(list); 
});
//服务器项目目录
//vue_server_00
//   public
//   pool.js
//   db.sql
//   app.js 
// 执行sql语句
// var sql="SELECT id title img_url ctime point content from xz_news LIMIT ? ?"
app.get("/newlist",(req,res)=>{
  //获取参数pno,pageSize;
  var pno=req.query.pno;//页码
  var pageSize=req.query.pageSize;//页大小（行数）
  //设置默认值，
  if(!pno){
    pno=1;
  }
  if(!pageSize){
    pageSize=7;
  }
  //创建sql语句
  var sql="SELECT id,title,img_url";
  sql+=",ctime,point,content";
  sql+=" FROM xz_news";
  sql+=" LIMIT ?,?";
  var ps=parseInt(pageSize);
  var offset=(pno-1)*pageSize;//（页码-1）*页大小=第几页
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
  })
})
//功能二：商品分页显示
app.get("/products",(req,res)=>{
  // 参数pno pageSize;
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  // 允许只用默认值pno=1,pageSize=7
  if(!pno){pno=1}
  if(!pageSize){pageSize=7}
  //创建sql语句；
  var sql="SELECT l.lid,l.title,";
  sql+=" l.price,p.md";
  sql+=" FROM xz_laptop l,xz_laptop_pic p";
  sql+=" WHERE l.lid = p.laptop_id";
  sql+=" GROUP BY l.lid";
  sql+=" LIMIT ?,?";
  //json
  var ps=parseInt(pageSize);
  var offset=(pno-1)*pageSize;
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result})
  })
})
// 功能三，获取新闻详细信息
app.get("/findNewsInfo",(req,res)=>{
  // 1,获取参数
  var id=req.query.id;
  // 2，创建正则表达式
  var reg=/^\d{1,}$/;
  // 3，如果验证失败，输出错误信息
  if(!reg.test(id)){
    res.send({code:-1,msg:"新闻编号的格式不正确"});
    return;
  }
  // 4.创建sql
  var sql="SELECT id,title,content,ctime";
    sql+=" ,img_url FROM xz_news";
    sql+=" WHERE id=?";
  // 5.发送sql语句；
    pool.query(sql,[id],(err,result)=>{
      if(err) throw err;
      res.send({code:-1,data:result})
    })
  // 6.输出查询结果，输出{code：1}
})
//功能四:获取评论的列表
app.get("/getComment",(req,res)=>{
  //1:nid
  var nid=req.query.nid;
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  if(!pno){pno=1}
  if(!pageSize){pageSize=5}
  var sql="SELECT  id,content,ctime,nid";
  sql+=" FROM xz_comment";
  sql+=" WHERE nid=?";
  sql+=" LIMIT ?,?";
  var offset=(pno-1)*pageSize;
  pageSize=parseInt(pageSize);
  pool.query(sql,[nid,offset,pageSize],(err,result)=>{
    if(err)throw err;
    res.send({code:1,data:result})
  })
})
//功能五get请求:将评论的内容放入数据库的xz_comment这个表中；
/*
app.get("/comment",(req,res)=>{
  var $content=req.query.p;
  if($content==""){
    res.send("0") 
    return ;
  }else{
  // console.log(obj)
  var $ctime=new Date();
  // console.log($content,$ctime)
  // INSERT INTO xz_comment VALUES(null,'赞一个1',now(),5);
  var sql="INSERT INTO xz_comment VALUES(?,?,?,?)"
  pool.query(sql,[null,$content,$ctime,5],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result})
    console.log(result)
  })
  }
})
*/
//功能五：post方式发表评论：
// 1.1、用户post请求，/addcomment
// 2.1、获取两个参数 nid content
// 3.1、创建sql语句，
// 4.1、发送sql语句并返回结果
// 5.1、判断评论成功，评论失败
// 6.1、加载body-parser 模块 配置
app.post("/addcomment",(req,res)=>{
  var nid=req.body.nid; //新闻的编号
  var content=req.body.content; //评论的内容
  var sql="INSERT INTO xz_comment VALUES(null,?,now(),?)"
  pool.query(sql,[content,nid],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
    res.send({code:1,msg:"评论发表成功"})
  }else{
    res.send({code:-1,msg:"评论发表失败"})
  }
  })
})
// 功能七，获取商品的详细信息
app.get("/findProduct",(req,res)=>{
  // 参数pid
 var pid=req.query.pid //商品的编号
 console.log(pid)
 var sql="SELECT lname,price FROM xz_laptop";
    sql+=" WHERE lid=?"
 pool.query(sql,[pid],(err,result)=>{
   if(err) throw err;
   res.send({code:1,data:result})
 })
})