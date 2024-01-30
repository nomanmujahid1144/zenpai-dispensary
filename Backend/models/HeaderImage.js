const mongoose = require('mongoose');
const HeaderImages = new mongoose.Schema({
    headerPhotos: {
        type: [String],
        default: [],
    },
    sliderPhoto: {
        type: String,
        default: ''
    },
},
    { timestamps: true })

module.exports = mongoose.model('headerImages', HeaderImages);
