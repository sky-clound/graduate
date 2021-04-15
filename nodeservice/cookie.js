// var Setcookie=function()
// {

// }


class Setcookie{
    constructor(){
        this.cookieArr=[]
    }
    token(){
        var str=''
        var mdl='wangzhixuanwangczcwangliwangnansdklkfhjdsfsdfhdskf'
        for(let i=0; i<20; i++)
        {
            if(i%3==0)
            {
                str+='-'
            }
            else
            {
                let getNum=parseInt(Math.random()*mdl.length)
                str += mdl[getNum]
            }
        }
        // 将得到的cookie信息存储在一个数组中
        this.cookieArr.push(str)
        return str;

    }
    // 用户登录时检查数组看cookie信息是否存储在数组中
    checkCookie(infornation)
    {
        // 对数组进行遍历如果cookie存在则登录
        for(let i=0; i<this.cookieArr.length; i++)
        {
            if(this.cookieArr[i]==infornation)
            {
                return true
            }
            else
            {
                return false;
            }
        }

    }
}

module.exports=Setcookie