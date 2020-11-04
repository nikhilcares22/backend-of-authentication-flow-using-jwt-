let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 6,
        trim: true
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', userSchema);