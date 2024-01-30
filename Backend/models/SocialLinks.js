const mongoose = require('mongoose');
const SocialLinks = new mongoose.Schema({
    instagram: {
        type: String,
        default: '',
    },
    twitter: {
        type: String,
        default: ''
    },
    telegram: {
        type: String,
        default: ''
    },
},
    { timestamps: true })

module.exports = mongoose.model('socialLinks', SocialLinks);
