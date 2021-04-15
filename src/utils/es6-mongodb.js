const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectId
const mongodbUrl = 'mongodb://127.0.0.1:27017'

class Mongodb_2 {
    constructor(dbName, tableName) {
        this.dbName = dbName;
        this.tableName = tableName
    }
    //    将每个方法必须要做的事情进行封装
    // 封装后需要传出的参数有：连接数据库时如果报错将错误拿出，选中的表名还有client用来关闭数据库
    // es6创建方法不需要this.但是如果构造方法要实现一个构造函数的方法需要this.
    Mustdo(callback) {
        // 每一个方法操作都要连接数据库
        MongoClient.connect(mongodbUrl, { useUnifiedTopology: true, useNewUrlParser: true }, (firErr, client) => {
            var db = client.db(this.dbName);
            if (firErr) {
                callback(firErr)
                return
            }

            else {
                callback(null, db.collection(this.tableName), client)
            }
        })
    }
    //    插入一个数据
    insertOne(insertInfor, callback) {
        // 连接数据库
        // MongoClient.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        //     var db = client.db(this.dbName)
        //     if (err) {
        //         callback(err)
        //     }
        //     else {
        //         db.collection(this.tableName).insertOne(insertInfor, (erro, ending) => {
        //             callback(null, erro, ending.result)
        //             client.close()
        //         })
        //     }
        // })
        this.Mustdo((firErr, operateTable, client) => {
            operateTable.insertOne(insertInfor, (secErr, ending) => {
            //    将结果还有还有回调函数引出
                callback(secErr, ending.result)
                client.close()
            })
        })
    }
    // 插入很多数据
    insertMany(insertArray, callback) {
        this.Mustdo((firErr, operateTable, client) => {
            operateTable.insertMany(insertArray, (secErr, ending) => {
                callback( secErr, ending.result)
                client.close();
            })
        })
    }



    // 删除一个数据
    deleteOne(deleteInfor, callback) {
        if (typeof deleteInfor == 'string') {
            this.Mustdo((firErr, operateTable, client) => {
                operateTable.deleteOne({ _id: ObjectId(deleteInfor) }, (secErr, ending) => {
                    callback(secErr, ending.result)
                    client.close();
                })
            })
        }
        else {
            this.Mustdo((firErr, operateTable, client) => {
                operateTable.deleteOne(deleteInfor, (secErr, ending) => {
                    callback( secErr, ending.result)
                    client.close();
                })
            })
        }
    }
    // 精准删除一个数据
    // deleteOneById(deleteId,callback){
    //     var deleteConditionObj={_id:ObjectId(deleteId)}
    //     this.deleteOne(deleteConditionObj,callback)
    // }
    //    删除很多数据
    deleteMany(deleteInfor, callback) {
        // 连接数据库
        // MongoClient.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (firErr, client) => {
        //     // 选库
        //     var db = client.db(this.dbName)
        //     if (firErr) {
        //         console.log(12345)
        //         callback(firErr)
        //         return
        //     }
        //     else {
        //         db.collection(this.tableName).deleteMany(deleteInfor, (secErr, ending) => {
        //             // 可以运行到此处说明第一个
        //             callback(null, secErr, ending.result)
        //             // 关闭连接
        //             client.close()
        //         })
        //     }
        // })
        this.Mustdo((firErr, operateTable, client) => {
            operateTable.deleteMany(deleteInfor, (secErr, ending) => {
                callback(secErr, ending.result)
                client.close()
            })
        })

    }
    updateOne(selectInfor, modifyInfor, callback) {
        if (typeof selectInfor == 'string') {
            this.Mustdo((firErr, operateTable, client) => {
                operateTable.updateOne({ _id: ObjectId(selectInfor) }, modifyInfor,(secErr, ending) => {
                    callback( secErr, ending.result)
                    client.close();
                })
            })
        }
        else {
            this.Mustdo((firErr, operateTable, client) => {
                operateTable.updateOne(selectInfor, modifyInfor, (secErr, ending) => {
                    callback(secErr, ending)
                    client.close()
                })
            })
        }
    }
    updateMany(selectInfor, modifyInfor, callback) {
        this.Mustdo((firErr, operateTable, client) => {
            operateTable.updateMany(selectInfor, modifyInfor, (secErr, ending) => {
                callback( secErr, ending.result)
                client.close()
            })
        })
    }

    find(findInfor, callback) {
        if (typeof findInfor == 'string') {
            this.Mustdo((firErr, operateTable, client) => {
                operateTable.find({ _id: ObjectId(findInfor)}).toArray((secErr, ending) => {
                    callback(secErr, ending)
                    client.close();
                })
            })
        }
        else {
            this.Mustdo((firErr, operateTable, client) => {
                operateTable.find(findInfor).toArray((secErr, ending) => {
                    callback(secErr, ending)
                    client.close()
                })
            })
        }
    }
}

var vn = new Mongodb_2('database', 'table')
// console.log(vn)
// console.log(vn)
// console.log(vn.insertOne)
// vn.insertOne({ name: 'hello', age: 'world' }, (secErr, result) => {
//     if (secErr) {
//         console.log(err)
//     }
//     else {
//         console.log(result)
//     }
// })


// vn.insertMany([{ name: 'hello', age: 'world' },{name:'cool',age:'boy'},{name:'beautiful',age:'girl'}], (secErr, result) => {
//     if (secErr) {
//         console.log(err)
//     }
//     else {
//         console.log(result)
//     }
// })

// vn.deleteMany({ name: '火男' }, (secErr, result) => {
//     console.log(result)
// })

// vn.deleteOne({ name: '二哈' }, (secErr, result) => {
//     console.log(result)
// })
// 精准删除一条数据
// vn.deleteOne('5e5f1af97f99712b90f5acc8', (  secErr, result) => {
//     console.log(result)
// })
// 精准更新一条数据
// vn.updateOne('5e5f278ec53f2113204a39ed', {$set:{chara:'小短腿'}},(  secErr, result) => {
//     console.log(result)
// })
// 精准获取一条数据
// vn.find('5e5f278ec53f2113204a39ed',(  secErr, result) => {
//     console.log(result)
// })

// vn.updateMany({ name: 'vn' }, {$set:{age:19}},(  secErr, result) => {
//     console.log(result)
// })


// vn.find({ name: 'vn' },(  secErr, result) => {
//     console.log(result)
// })

module.exports=Mongodb_2