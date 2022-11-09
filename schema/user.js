const joi = require('joi')

const id = joi.number().integer().min(1).required()
const username = joi.string().min(1).max(10).required()
const password = joi.string().alphanum().min(5).max(10).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

const newPwd = joi.not(joi.ref('oldPwd')).concat(password)

const avatar = joi.string().dataUri().required()

exports.schemaLoginRule = {
    body:{
        username,
        password,
    }
}

exports.schemaUpdateRule = {
    body:{
        // id,
        nickname,
        email
    }
}

exports.schemaUpdatePwdRule = {
    body:{
        oldPwd:password,
        newPwd
    }
}

exports.schemaUpdateAvatarRule = {
    body:{
        avatar
    }
}

// exports.userSchema = (data,schema)=>{
//     const result = schema.validate(data)
//     if(result.error){
//         throw result.error
//     }
    // if(result.error instanceof joi.ValidationError){
    //     console.log('数据不正确')
    // }
// }