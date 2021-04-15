// 用户端
const express = require('express');
const app = express();
const router = express.Router();
const ejs = require('ejs')
const path = require('path')
const Mongo = require('./tools/es6-mongodb')
// 文章数据库
const DataObj = new Mongo('blog', 'content')
// 评论数据库
const ContentObj = new Mongo('blogcontent', 'table')
const querystring = require('querystring')
const bodyParser = require('body-parser')
const moment = require('moment')

const CookieParser = require('cookie-parser')
router.use(CookieParser())


const Cookie = require('./cookie')
const CookieObj = new Cookie()

var now = moment().format("YYYY-MM-DD HH:mm:ss")

router.use(bodyParser.urlencoded({ extended: false }))

router.get('/', (req, res) => {
    // 首先获取数据库中的数据，然后将他们通过ejs填充到页面
    // 获取数据

        DataObj.find({}, (err, ending) => {
            if (err) {
                console.log(err)
            }
            else {
                ejs.renderFile('./public/index.html', { data: ending }, (err, html) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        res.send(html)
                    }
                })
            }
        })
})

router.get('/person', (req, res) => {
    // 首先获取数据库中的数据，然后将他们通过ejs填充到页面
    // 获取数据
    DataObj.find({}, (err, ending) => {
        if (err) {
            console.log(err)
        }
        else {
            ejs.renderFile('./public/loginAfterPage.html', { data: ending }, (err, html) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.send(html)
                }
            })
        }
    })
})
// 获取文章页面 显示文章内容，同时将数据库中的评论也带进来，获取titleId=_id的内容
router.get('/page', (req, res) => {
    // 前端发送的信息包含在query中
    var { _id } = req.query
    DataObj.find(_id, (secErr, result) => {
        if (secErr) {
            console.log(secErr)
        }
        else {
            ContentObj.find({ titleId: _id, status: 1 }, (err, contentResult) => {
                // 将数据库中得到的status为0评论和文章目录获取到，然后通过ejs渲染页面
                if (err) {
                    console.log(err)
                }
                else {
                    ejs.renderFile('./public/page.html', { data: result[0], contentResult: contentResult }, (err, html) => {
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

// 将用户发送的评论放到数据库中
router.post('/submitComment', (req, res) => {
    // 获取用户提交的评论
    // status用来控制评论的状态如果为1那么就是已经审核通过,否则就是没有审核的
    var { email, content } = req.body
    // 获取文章的Id
    var { _id } = req.query
    // 将文章的id重新赋值
    var titleId = _id
    // 将获取的评论插入数据库
    ContentObj.insertOne({ email: email, content: content, time: now, status: 0, titleId: titleId }, (err, ending) => {
        if (err) {
            console.log(err)
        }
        else {
            // res.send('等待审核')
            //     console.log(ending)
            res.redirect('http://localhost:3000/page?_id=' + titleId)
        }
    })
})
module.exports = router;