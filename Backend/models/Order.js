const mongoose = require('mongoose')

const GeoSchema = new mongoose.Schema({
    _id: false,
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});

const orderSchema = new mongoose.Schema({
    orderid: { type: String, default: '' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPerson' },
    details: [{
        _id: false,
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        productTotal: { type: Number, default: 0 },
        quantity: {
            type: String
        }
    }],
    status: {
        type: Number,
        default: 0
    },
    manualOrderCompletestatus: {
        type: Number,
        default: 0
    },
    pickUpStatus: {
        type: Number,
        default: 0
    },
    geometry: GeoSchema,
    totalPrice: {
        type: Number
    },
    deliveryFee: {
        type: Number
    },
    totalTax: {
        type: Number
    },
    totalProducts: {
        type: Number
    },
    subTotal: {
        type: Number
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    shopAddress: {
        type: String
    },
    deliveryType: {
        type: String
    },
    paymentMethod: {
        type: String
    },
    postalCode: {
        type: String,
    },
    drivers: {
        type: Array,
        default: []
    },
    date: {
        type: String
    },
    time: {
        type: String
    },

}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)