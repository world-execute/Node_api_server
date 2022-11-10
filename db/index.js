const mysql = require('mysql')
// 创建连接池
const db = mysql.createPool({
    // 主机地址
    host:'localhost',
    // 用户名
    user:'root',
    // 密码
    password:'622821',
    // 数据库
    database:'test'
})
module.exports = db
