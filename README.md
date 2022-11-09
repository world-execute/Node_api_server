# 基于Node.js创建的接口服务器
**练习项目,没啥技术含量**  
来源于[B站up黑马程序员](https://www.bilibili.com/video/BV1a34y167AZ)  
老师讲的真好,知识点也划分的很细,想使用node.js开发后端接口的小伙伴可以去学习下   
基于Node.js环境创建的接口服务器,可以进行登录与用户信息的增删改查  
# 安装与使用
## 开发环境
- Node.js v14.20.0
- npm v6.14.17
- nodemon v2.0.20
- MySQL v5.7
- WebStorm
- VSCode
---
## 启动
启动服务器   
/api_server 
```
npm install
node app.js
```
使用nodemon热部署启动服务器
(确定已经将npm全局下载目录加入系统环境变量中)
```
npm install
npm i nodemon -g
nodemon app.js
```
---

## 配置
数据库配置文件`db/index.js`  
```javaScript
const db = mysql.createPool({
    host:'localhost',  // 数据库地址
    user:'root',  // 用户名
    password:'622821',  // 密码
    database:'test'  // 使用的数据库
})
```
jwt过期时间`config.js` 
```javaScript
option:{
        expiresIn: '10h',
        // 可选参数 s秒,m分钟,h小时,d天
    }
```
---
# 接口文档
| 请求地址 | 请求方式 | 请求参数 | 响应结果 |  
|:-:|:-:|:-:|:-:|
| /api/register | POST | username,password | status,msg |

## 闲话
推荐个API测试软件(没恰饭),就是国产的<kbd>Apifox</kbd>,相比postman优点就是可以写对应的数据模型,自动生成数据,还能导出接口文档,爱了  
**---------------->[官网](https://www.apifox.cn/)<---------------------**  


![软件截图](https://s1.ax1x.com/2022/10/21/xcGsoV.png "下载试试吧")
