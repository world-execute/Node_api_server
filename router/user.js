const express =require('express')
const userRouter = express.Router()
const routerHandler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')
const {schemaLoginRule} = require('../schema/user')

userRouter.post('/register',expressJoi(schemaLoginRule),routerHandler.regUser)
userRouter.post('/login',expressJoi(schemaLoginRule),routerHandler.login)

module.exports = userRouter
