const mongoose = require('mongoose');
const User = new mongoose.Schema({
    fullName: {
        type: String,

    },
    profilePhoto: {
        type: String,
        default: ''
    },
    govtIdImage: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        match: [
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            'Please add a valid email'
        ],
        unique: [true, "This email already exists"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String
    },
    ageVerification: {
        type: Boolean,
        default: "false"
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    fcmToken: {
        type: String
    },
    accessToken: {
        type: String
    },
    refreshToken: {
        type: String
    },
    geometry : {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
    },
    radius: {
        type: String,
    },
    formattedAddress:{
        type: String,
        default : ''
    },
    verified: {
        type: Boolean,
        default: 'false'
    },
    blocked: {
        type: Boolean,
        default: 'false'
    },
    deactivate: {
        type: Number,
        default: 0
    },
},
    { timestamps: true })

module.exports = mongoose.model('User', User);
