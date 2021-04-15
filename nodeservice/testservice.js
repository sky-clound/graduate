// express
const express=require('express')
const app=express(); //相当于建立一个服务器
const path=require('path')
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('./'))//参数为文件夹名  

// express实现get请求
app.get('/test',(req,res)=>
{
    console.log(9999999999999)
    // 向前端发送数据只需要一个
    res.send('测试地址')
})

app.listen(3000)