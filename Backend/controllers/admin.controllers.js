const ErrorResponse = require('../utils/errorResponse');
const Admin = require('../models/Admin');
const Radius = require('../models/Radius');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');
const Tax = require('../models/Tax');
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.adminSignup = async (req, res, next) => {
    try {
        console.log(req.body)
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        let admin = new Admin({
            name : req.body.name,
            email: req.body.email,
            password: hash 
        })
        const token =  jsonwebtoken.sign(
            {
              data: [admin.email, admin._id],
              role: "admin",
            },
            "" + process.env.JWT_SECRET
          );
        const result = await admin.save();
        if (!result) {
            return next(new ErrorResponse('Signup failed', 400))
        }
        return res.status(200).json({
            success: true,
            message: "Signup successfull",
            token
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}

exports.adminLogin = async (req, res, next) => {
    try {
        const result = await Admin.findOne({ email: req.body.email });
        if (!result) {
            // this means result is null
            return next(new ErrorResponse('Incorrect email address', 200))
        } else {
            // email did exist
            // so lets match password
            if (bcrypt.compareSync(req.body.password, result.password)) {
                // great, allow this user access
                const token = jsonwebtoken.sign({
                    data: [result.email, result._id],
                    role: 'admin'
                }, "" + process.env.JWT_SECRET);
                console.log(token);
                return res.status(200).json({
                    success: true,
                    message: 'Successfully Logged in',
                    token: token
                });
            }
            else {
                return next(new ErrorResponse('Incorrect password', 200))
            }
        }
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}

exports.setRadius = async (req, res, next) => {
    console.log(req.body)
    try {
        const alreadyPresent = await Radius.deleteMany({})
        if (alreadyPresent.ok == 1) {
            const radius = await Radius.insertMany(req.body)
            if (radius) {
                return res.status(200).json({
                    success: true,
                    message: 'radius saved successfully',
                    data: []
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: 'Error Adding Radius',
                    data: []
                });
            }

        }
        else {
            return res.status(400).json({
                success: false,
                message: 'Error Adding Radius',
                data: []
            });
        }
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}


exports.getRadius = async (req, res, next) => {

    try {
        const alreadyPresent = await Radius.find({})
        console.log(alreadyPresent)
        if (alreadyPresent) {
            return res.status(200).json({
                success: true,
                message: 'Got Radius Successfully',
                data: alreadyPresent
            });

        }
        return res.status(200).json({
            success: false,
            message: 'No Radius Found',
            data: []
        });


    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}

exports.getAdmin = async (req, res, next) => {

    try {
        const alreadyPresent = await Admin.findOne({})
        console.log(alreadyPresent)
        if (alreadyPresent) {
            return res.status(200).json({
                success: true,
                message: 'Got Admin Successfully',
                data: alreadyPresent
            });

        }
        return res.status(200).json({
            success: false,
            message: 'No Admin Found',
            data: null
        });


    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}

exports.setTax = async (req, res, next) => {
    console.log(req.body)
    try {
        const alreadyPresent = await Tax.findOne({})
        if (!alreadyPresent) {
            const tax = new Tax({
                totalTax: req.body.tax,
                pricePerMile: req.body.pricePerMile
            })
            const approvedTax = await tax.save()
            return res.status(200).json({
                success: true,
                message: 'Tax Updated Successfully',
                data: approvedTax
            });

        }
        else {
            const toBeUpdated = {
                totalTax: req.body.totalTax,
                pricePerMile: req.body.pricePerMile
            }
            const updateTax = await Tax.findOneAndUpdate({ _id: mongoose.Types.ObjectId(alreadyPresent._id) }, toBeUpdated, { new: true })
            if (updateTax) {
                return res.status(200).json({
                    success: true,
                    message: 'Tax Updated Successfully',
                    data: updateTax
                });
            }
        }

    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}

exports.getTax = async (req, res, next) => {

    try {
        const alreadyPresent = await Tax.findOne({}, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 })
        if (alreadyPresent) {
            return res.status(200).json({
                success: true,
                message: 'Got Tax Successfully',
                data: alreadyPresent
            });

        }
        return res.status(200).json({
            success: false,
            message: 'No Tax Found',
            data: []
        });


    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}


exports.getDashboardData = async (req, res, next) => {

    try {
        let ordersPending = await Order.aggregate([
            {
                $facet: {
                    "totalPendingOrders": [
                        { $match: { status: 0 } },
                        { $count: "totalPendingOrders" },
                    ],
                    "last24HoursPendingOrders": [
                        { $match: { status: 0, "updatedAt": { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } } },
                        { $count: "last24HoursPendingOrders" }
                    ],
                }
            },
            {
                $project: {
                    "totalPendingOrders": { "$arrayElemAt": ["$totalPendingOrders.totalPendingOrders", 0] },
                    "last24HoursPendingOrders": { "$arrayElemAt": ["$last24HoursPendingOrders.last24HoursPendingOrders", 0] },
                }
            }
        ])

        let ordersAll = await Order.aggregate([
            {
                $facet: {
                    "totalAllOrders": [
                        { $count: "totalAllOrders" },
                    ],
                    "last24HoursAllOrders": [
                        { $match: { "createdAt": { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } } },
                        { $count: "last24HoursAllOrders" }
                    ],
                }
            },
            {
                $project: {
                    "totalAllOrders": { "$arrayElemAt": ["$totalAllOrders.totalAllOrders", 0] },
                    "last24HoursAllOrders": { "$arrayElemAt": ["$last24HoursAllOrders.last24HoursAllOrders", 0] },
                }
            }
        ])
        let ordersCompleted = await Order.aggregate([
            {
                $facet: {
                    "totalCompletedOrders": [
                        { $match: { status: 5 } },
                        { $count: "totalCompletedOrders" },
                    ],
                    "last24HoursCompletedOrders": [
                        { $match: { status: 5, "updatedAt": { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } } },
                        { $count: "last24HoursCompletedOrders" }
                    ],
                }
            },
            {
                $project: {
                    "totalCompletedOrders": { "$arrayElemAt": ["$totalCompletedOrders.totalCompletedOrders", 0] },
                    "last24HoursCompletedOrders": { "$arrayElemAt": ["$last24HoursCompletedOrders.last24HoursCompletedOrders", 0] },
                }
            }
        ])
        let productsAdded = await Product.aggregate([
            {
                $facet: {
                    "totalAddedProducts": [
                        { $count: "totalAddedProducts" },
                    ],
                    "last24HoursAddedProducts": [
                        { $match: {"createdAt": { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } } },
                        { $count: "last24HoursAddedProducts" }
                    ],
                }
            },
            {
                $project: {
                    "totalAddedProducts": { "$arrayElemAt": ["$totalAddedProducts.totalAddedProducts", 0] },
                    "last24HoursAddedProducts": { "$arrayElemAt": ["$last24HoursAddedProducts.last24HoursAddedProducts", 0] },
                }
            }
        ])

        if (ordersPending) {
            return res.status(200).json({
                success: true,
                message: 'Got Dashboard Data Successfully',
                data: [
                    ordersAll[0],
                    ordersPending[0],
                    ordersCompleted[0],
                    productsAdded[0]
                ]
            });

        }
        return res.status(200).json({
            success: false,
            message: 'No Dashboard Data Found',
            data: []
        });


    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}


