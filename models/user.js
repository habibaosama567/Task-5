const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const userschema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('Email is invaild')
            }
        }
    },
    age: {
        type: Number,
        default: 18,
        validate(val) {
            if (val <= 0) {
                throw new Error('age must be greater than 0')
            }
        }
    },
    city: {
        type: String
    }
})

userschema.pre('save', async function () {
    const user = this   //===> this = document in the database

    if (user.isModified('password'))
        user.password = await bcryptjs.hash(user.password, 8)

})
const user = mongoose.model('user', userschema)
module.exports = user