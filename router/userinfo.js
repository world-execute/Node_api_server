const express =require('express')
const userinfoRouter = express.Router()
const userinfo_handler = require('../router_handler/userinfo')
const expressJoi = require('@escook/express-joi')
const {schemaUpdateRule,schemaUpdatePwdRule,schemaUpdateAvatarRule} = require('../schema/user')

userinfoRouter.get('/userinfo',userinfo_handler.getUserInfo)
userinfoRouter.post('/update/userinfo',expressJoi(schemaUpdateRule),userinfo_handler.updateUserInfo)
userinfoRouter.post('/update/userPwd',expressJoi(schemaUpdatePwdRule),userinfo_handler.updateUserPwd)
userinfoRouter.post('/update/avatar',expressJoi(schemaUpdateAvatarRule),userinfo_handler.updateUserAvatar)

module.exports = userinfoRouter