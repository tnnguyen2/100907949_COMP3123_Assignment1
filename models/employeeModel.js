const mongoose = require('mongoose')

let employeeSchema = mongoose.Schema({
    first_name:{
        type: String,
        required: true,
        maxLength: 100
    },
    last_name:{
        type: String,
        required: true,
        maxLength: 50
    },
    email:{
        type: String,
        unique: true,
        required: true,
        maxLength: 50
    },
    gender:{
        type: String,
        required: true,
        enum: ["Male","Female","Other"],
        maxLength: 25
    },
    salary:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Employee', employeeSchema);