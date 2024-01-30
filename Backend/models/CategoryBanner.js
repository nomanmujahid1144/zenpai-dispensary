const mongoose = require('mongoose')
const categoryBannerSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        default: '',
        trim: true,
        lowercase: true,
    },
    categoryBannerPhoto: { type: String },

}, { timestamps: true })

module.exports = mongoose.model('CategoryBanner', categoryBannerSchema)