const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.getUserInfo = (req,res)=>{
    // console.log(req.auth.id)
    const sql = `select id, username, nickname, email, user_pic from users where id=?`
    db.query(sql,req.auth.id,(err,results)=>{
        if(err) return res.cc(err)
        // 执行sql语句成功,但是查询结果可能为空
        if(results.length === 0) return res.cc('获取用户信息失败')

        res.send({
            status:0,
            msg:'获取用户信息成功',
            data:results[0]
        })
    })
}

exports.updateUserInfo = (req,res)=>{
    const sql = `update users set ? where id=?`
    db.query(sql,[req.body,req.auth.id],(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !== 1)return res.cc('修改个人信息失败')
        return  res.cc('修改个人信息成功',0)
    })
}

exports.updateUserPwd = (req,res)=>{
    //根据id查询用户信息
    const sql = 'select * from users where id=?'
    db.query(sql,req.auth.id,(err,results)=>{
        if(err) return res.cc(err)
        // console.log(results)
        if(results.length !== 1) return res.cc('用户不存在')

        // 判断用户输入的旧密码是否正确
        const bcryptResult = bcrypt.compareSync(req.body.oldPwd,results[0].password)
        if(!bcryptResult)return res.cc('旧密码错误')

        //更新数据库中的密码
        //加密新的密码
        const newPwd = bcrypt.hashSync(req.body.newPwd,10)
        // console.log(newPwd)
        // 更新数据库中的密码
        const updatePwdSql = 'update users set password=? where id=?'
        db.query(updatePwdSql,[newPwd,req.auth.id],(err,results)=>{
            if(err) return res.cc(err)
            if(results.affectedRows !==1) return res.cc('修改密码失败')
            return res.cc('修改密码成功',0)
        })
    })
}

exports.updateUserAvatar = (req,res)=>{
    const sql = 'update users set user_pic=? where id=?'
    db.query(sql,[req.body.avatar,req.auth.id],(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('更新用户头像失败')
        return res.cc('更新头像成功',0)
    })
}