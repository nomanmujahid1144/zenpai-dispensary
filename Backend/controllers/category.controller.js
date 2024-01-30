const ErrorResponse = require('../utils/errorResponse');
const { uploadImage } = require('../helpers/helpers');
const Categories = require('../models/Category');
const fs            = require('fs');
const mongoose = require('mongoose');
const Category = require('../models/Category');

exports.addCategory = async (req, res, next) => {
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
        const Category = new Categories({
            brand: body.brand,
            category: body.category,
            subCategory: body.subCategory,
            type: body.type,
            categoryPhoto: uploadedPath.photoPath
        })
        const addedCategory = await Category.save()
        console.log(addedCategory)
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
exports.updateCategory = async (req, res, next) => {
    try {
        console.log( req.query ,'query got here success fully')
        console.log( req.files ,'files got here success fully')
        const body = JSON.parse(req.query.values)
        const id = req.query.id
        if (req.files) {
            const toBeUpdated = await Category.findOne({ _id: mongoose.Types.ObjectId(id) }).select('categoryPhoto')
            fs.unlink(`${process.env.FILE_DELETE_PATH}${toBeUpdated.categoryPhoto}`, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            });
            const uploadedPath = await uploadImage(req.files.image, next)
            body.categoryPhoto = uploadedPath.photoPath
        }
        const updatedCategory = await Category.updateOne({ _id: mongoose.Types.ObjectId(id) }, body)
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


exports.getAllCategories = async (req, res, next) => {
    try {
        const Categories = await Category.find({})
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

exports.getSingleBrand = async (req, res, next) => {
    console.log(req.query.brand , "Single Brand")
    try {
        const Categories = await Category.findOne({'brand' : req.query.brand})
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

exports.getAllProductsClientSide = async (req, res, next) => {
    try {
        const products = await Product.find({})
        if (products.length <= 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No products found'
            })
        }
        let resArray = []
        products.forEach(element => {
            let newObj = {
                category: element.category,
                item: element
            }
            resArray.push(newObj)
        });
        return res.status(200).json({
            success: true,
            data: resArray,
            message: "Products found"
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}

exports.deleteCategories = async (req, res, next) => {
    try {
        console.log(req.query , 'Ids')
        console.log(req.query.IDS)
        let deletedCount = 0
        Promise.all(req.query.IDS.map(async (element) => {
            const deletedProducts = await Category.deleteOne({ _id: mongoose.Types.ObjectId(element) })
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





