const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type:String, required:true
    },
    email: {
        type:String, required:true
    },
    password: {
        type:String, required:true
    },
    id: {
        type:String
    },
    statistics: {
        type: [Number],
        default: [0, 0, 0, 0]
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User