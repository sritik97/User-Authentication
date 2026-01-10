


const mongoose = require('mongoose')



const authSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        unique:true
    }
})

const authModel = mongoose.model("userauth",authSchema)
module.exports = authModel