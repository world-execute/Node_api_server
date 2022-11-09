const db = require('../db/index')
const bcrypt = require('bcryptjs')
const {number} = require("joi");
// const userSchema = require('../schema/user')
// const {schemaRule} = require('../schema/user')
const jwt = require('jsonwebtoken')
const config = require('../config')


exports.regUser = (req,res)=>{
    // 获取客户端提供到服务器的数据
    const userInfo = req.body
    // 对表单数据进行简单的合法性验证
    // if(!userInfo.username || !userInfo.password){
    //     return res.cc('用户名或密码不合法')
    // }

    // 检测用户名是否被占用
    const sql = 'select * from users where username=?'
    db.query(sql,userInfo.username,(err,results)=>{
        // 执行sql语句失败
        if(err) return res.cc(err)
        if(results.length > 0 ) return res.cc('用户名已经被占用')


        //将用户名密码加密
        console.log('加密前:'+userInfo.password)
        userInfo.password = bcrypt.hashSync(userInfo.password,10)
        console.log('加密后:'+userInfo.password)

        //将用户名插入数据库
        const sqlUpdate = 'insert into users set ?'
        db.query(sqlUpdate,{username:userInfo.username,password:userInfo.password},(err,results)=>{
            if(err) return res.cc(err)
            if(results.length === 0 ) return res.cc('注册失败')
            res.cc('注册成功',0)
        })


    })

    // res.send('ok')
}

exports.login = (req,res)=>{
    const userInfo = req.body
    const sql = 'select * from users where username=?'
    db.query(sql,userInfo.username,(err,results)=> {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户名不存在')


        // 对加密的用户密码进行比较
        const compareResult =  bcrypt.compareSync(userInfo.password,results[0].password)
        if(!compareResult) return res.cc('密码错误登陆失败')

        // console.log(results)
        // 将密码和头像数据设空(ES6语法,将数组按键值对的方式展开)
        const user = {...results[0],password:'',user_pic:''}
        console.log(user)
        //对用户信息加密,生成Token令牌
        jwt.sign(user,config.jwtSecretKey,config.option,(err,token)=>{
            if(err)return console.log(err)
            // console.log(token)
            res.send({
                status:0,
                msg:'登陆成功',
                token:'Bearer '+token
            })
        })

    })

}