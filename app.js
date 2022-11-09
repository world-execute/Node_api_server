const express = require('express')
const cors = require("cors");
const app = express()
const port = 8080
const userRouter = require('./router/user')
const userinfoRouter = require('./router/userinfo')
const joi = require("joi");
const config = require('./config')
const eJwt= require('express-jwt')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(eJwt.expressjwt({secret:config.jwtSecretKey,algorithms:["HS256"]}).unless({path:[/^\/api\//]}))

app.use((req, res, next) => {
    res.cc = (msg,status = 1)=>{
        //status = 0 代表成功,1为失败
        res.send({
            status,
            msg: msg instanceof Error? msg.message:msg
        })
    }
    next()
})

app.use('/api',userRouter)
app.use('/my',userinfoRouter)

// 错误级别的中间件
app.use((err,req, res, next) => {
    if(err){
        if(err.name === 'ValidationError') return res.send({status:1,msg:'数据格式有误! '+err.message})
        if(err.name === 'UnauthorizedError') return res.send({status:1,msg:'Token无效或已过期'})
        // res.send({status:1,msg:'发生未知错误'+err})
        console.log(err)
    }

})

app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
})