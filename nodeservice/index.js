// 利用npm下载jQuery还有bootstrap
// npm install bootstrap jQuery --save

const express = require('express');
const app = express();
// app.use(express.static('./public'))

// 将接口分为用户访问和管理者访问
app.use('/admin',require('./admin'))
app.use('/',require('./user'))



app.listen(3000)