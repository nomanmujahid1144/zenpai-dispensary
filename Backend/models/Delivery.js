const mongoose = require('mongoose');
const Delivery = new mongoose.Schema({
    heading: {
        type: String,
        default: ''
    },
    data: {
        type: String,
        default: ''
    },
},
    { timestamps: true })

module.exports = mongoose.model('Delivery', Delivery);
