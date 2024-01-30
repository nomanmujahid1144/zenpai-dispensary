const ErrorResponse = require('../utils/errorResponse');
const { uploadImage } = require('../helpers/helpers');
const fs            = require('fs');
const mongoose = require('mongoose');
const Banner = require('../models/CategoryBanner');

exports.addBanner = async (req, res, next) => {
    try {
        console.log( req.query ,'query got here success fully')
        console.log( req.files ,'files got here success fully')
        const body = JSON.parse(req.query.values)
        // const body = req.body;
        if (!req.files) {
            return res.status(200).json({
                success: false,
                data: null,
                message: 'Upload Image'
            })
        }
        const uploadedPath = await uploadImage(req.files.image, next)
        console.log(uploadedPath, 'path')
        const Category = new Banner({
            categoryBannerPhoto: uploadedPath.photoPath,
            categoryId: body.categoryId,
        })
        const addedCategory = await Category.save();

        if (!addedCategory) {
            return next(new ErrorResponse('add category failed', 400))
        }
        return res.status(200).json({
            success: true,
            data: addedCategory
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}
exports.updateBanner = async (req, res, next) => {
    try {
        console.log( req.query ,'query got here success fully')
        console.log( req.files ,'files got here success fully')
        const body = JSON.parse(req.query.values)
        const id = req.query.id
        if (req.files) {
            const toBeUpdated = await Banner.findOne({ _id: mongoose.Types.ObjectId(id) }).select('categoryBannerPhoto')
            fs.unlink(`${process.env.FILE_DELETE_PATH}${toBeUpdated.categoryBannerPhoto}`, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            });
            const uploadedPath = await uploadImage(req.files.image, next)
            body.categoryBannerPhoto = uploadedPath.photoPath
        }
        const updatedCategory = await Banner.updateOne({ _id: mongoose.Types.ObjectId(id) }, body)
        if (updatedCategory.nModified !== 1) {
            return res.status(200).json({
                data: null,
                message: 'update failed',
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            data: null,
            message: 'Category Updated Successfully'
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}


exports.getAllBanners = async (req, res, next) => {
    try {
        const Categories = await Banner.find({}).populate('categoryId')
        console.log(Categories)
        if (Categories.length <= 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No Category found'
            })
        }
        return res.status(200).json({
            success: true,
            data: Categories,
            message: "Categories found"
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}

exports.getSingleBanner = async (req, res, next) => {
    console.log(req.query.categoryId , "Single Brand")
    try {
        const Categories = await Banner.findOne({'categoryId' : req.query.categoryId})
        console.log(Categories)
        if (Categories?.length <= 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No Category found'
            })
        }
        return res.status(200).json({
            success: true,
            data: Categories,
            message: "Categories found"
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}


exports.deleteBanner = async (req, res, next) => {
    try {
        console.log(req.query , 'Ids')
        console.log(req.query.IDS)
        let deletedCount = 0
        Promise.all(req.query.IDS.map(async (element) => {
            const deletedProducts = await Banner.deleteOne({ _id: mongoose.Types.ObjectId(element) })
            console.log(deletedProducts)
            if (deletedProducts.n >= 1) {
                deletedCount = deletedCount + 1
            }
            console.log(deletedCount, "inside map deleted count")
        })).then(
            () => {
                console.log('deleted count', deletedCount)
                if (req.query.IDS.length === deletedCount) {
                    return res.status(200).json({
                        success: true,
                        message: "Deleted Successfully",
                        data: null
                    })
                }
                else {
                    return res.status(400).json({
                        success: false,
                        data: null,
                        message: 'deletion failed'
                    })
                }

            }

        );

    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}





