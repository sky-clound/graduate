// 管理者端
const express = require('express');
const app = express();
const router = express.Router();
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
// 数据库
const Mongo = require('./tools/es6-mongodb')
// 文章数据库
const DataObj = new Mongo('blog', 'content')
// 评论数据库
const ContentObj = new Mongo('blogcontent', 'table')
const moment = require('moment')
const CookieParser = require('cookie-parser')
router.use(CookieParser())

const Cookie = require('../src/service/cookie')
const CookieObj = new Cookie()

var now = moment().format("YYYY-MM-DD HH:mm:ss")

// http://localhost:3000/admin/admin
// index会将app.use中的接口拼到下面的接口前 所以 http://localhost:3000/admin不可以输出admin
// 通过ejs将页面渲染好
router.post('/myself', (req, res) => {
    var { username, password } = req.body
    if (username == 'wangczc' && password == '123456') {
        res.cookie('token',CookieObj.token())
        // 查找文章目录
        DataObj.find({}, (err, ending) => {
            if (err) {
                console.log(err)
            }
            else {
                ContentObj.find({ status: 0 }, (err, contentResult) => {
                    // 将数据库中得到的status为0评论和文章目录获取到，然后通过ejs渲染页面
                    if (err) {
                        console.log(err)
                    }
                    else {
                        ejs.renderFile('./public/adminPage.html', { data: ending ,contentResult:contentResult}, (err, html) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                res.send(html)
                            }
                        })
                    }
                })
            }
        })
    }
    else
    {
        res.send('密码错误')
    }
})


router.get('/myself', (req, res) => {
    DataObj.find({}, (err, ending) => {
        if (err) {
            console.log(err)
        }
        else {
            ContentObj.find({ status: 0 }, (err, contentResult) => {
                // 将数据库中得到的status为0评论和文章目录获取到，然后通过ejs渲染页面
                if (err) {
                    console.log(err)
                }
                else {
                    ejs.renderFile('./public/adminPage.html', { data: ending ,contentResult:contentResult}, (err, html) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            res.send(html)
                        }
                    })
                }
            })
        }
    })
})

router.get('/deletitle', (req, res) => {
    var { _id } = req.query
    console.log(_id)
    DataObj.deleteOne(_id, (err, ending) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('http://localhost:3000/admin/myself')
        }
    })
})

router.post('/addtitle', (req, res) => {
    console.log(req.body)
    var { author, title, titlecontent } = req.body
    DataObj.insertOne({ title: title, author: author, time: now, content: titlecontent }, (err, ending) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('http://localhost:3000/admin/myself')
        }
    })
})
// 通过操作将数据库中的数值更改为status：1
router.get('/pass',(req,res)=>{
    var {_id} = req.query
    
    // console.log(req.query)
    ContentObj.updateOne(_id, {$set:{status:1}},(err,ending)=>{
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.redirect('http://localhost:3000/admin/myself')
        }
    })

})
// 如果不通过直接将评论从数据库中删除
router.get('/nopass',(req,res)=>{
    var {_id} = req.query
    // console.log(req.query)
    ContentObj.deleteOne(_id,(err,ending)=>{
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.redirect('http://localhost:3000/admin/myself')
        }
    })
})


module.exports = router;