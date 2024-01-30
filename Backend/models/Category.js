const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    brand: {
        type: String,
        default: '',
        trim: true,
        lowercase: true,
    },
    category: {
        type: Array,
        default: [],
        lowercase: true,
    },
    subCategory: {
        type: Array,
        default: [],
        lowercase: true,
    },
    type: {
        type: Array,
        default: [],
        lowercase: true,
    },
    categoryPhoto: { type: String },

}, { timestamps: true })

module.exports = mongoose.model('Category', categorySchema)