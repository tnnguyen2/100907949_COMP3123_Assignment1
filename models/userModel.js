const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        maxLength: 100
    },
    email:{
        type:String,
        unique: true,
        required: true,
        maxLength: 50
    },
    password:{
        type:String,
        required:true,
        maxLength: 50
    }
})

module.exports = mongoose.model('user',userSchema)