const mysql = require('mysql')
const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'622821',
    database:'test'
})
module.exports = db