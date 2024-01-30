const ErrorResponse = require('../utils/errorResponse');
const { uploadImage } = require('../helpers/helpers');
const HeaderImage = require('../models/HeaderImage');
const mongoose = require('mongoose');



exports.AddHeaderImage = async (req, res, next) => {
    try {
  
      let body = req.body;

      const headerPhotos = req.files;

      const savedPhotoPaths = [];

      // Loop through each key in the headerPhotos object using for...of
      for (const key of Object.keys(headerPhotos)) {
        const file = headerPhotos[key];
        
        try {
          // Process and save the image using your uploadImage function
          const uploadedPhoto = await uploadImage(file, next);
          
          // Save the photo path to the array
          savedPhotoPaths.push(uploadedPhoto.photoPath);
        } catch (error) {
          // Handle any errors that occur during image processing
          console.error(`Error processing image ${key}: ${error.message}`);
        }
      }
  
      const findImage = await HeaderImage.find({})

      let headerImg ; 
      
      if(findImage.length != 0){
        headerImg  =await  HeaderImage.findByIdAndUpdate({_id : mongoose.Types.ObjectId(findImage[0]._id)} , {
          headerPhotos: savedPhotoPaths,
        })
      }else{
        const images = new HeaderImage({
          headerPhotos : savedPhotoPaths,
        });
  
        headerImg  = images.save();
      }


      if (!headerImg) {
        return next(new ErrorResponse("add Header Images failed", 400));
      }
      return res.status(200).json({
        success: true,
        message: "Successfully Added",
        data: headerImg,
      });

    } catch (err) {
      return next(new ErrorResponse(err, 400));
    }
};

exports.AddBottomImage = async (req, res, next) => {
    try {
  
      let body = req.body;
      
      if (req.files) {
        if (req.files.sliderPhoto) {
          const secondPhotoUploaded = await uploadImage(
            req.files.sliderPhoto,
            next
          );
          body.sliderPhoto = secondPhotoUploaded.photoPath;
        }
      }
  
      const findImage = await HeaderImage.find({})

      let headerImg ; 
      
      if(findImage.length != 0){
        headerImg  =await  HeaderImage.findByIdAndUpdate({_id : mongoose.Types.ObjectId(findImage[0]._id)} , {
          sliderPhoto : body.sliderPhoto
        })
      }else{
        const images = new HeaderImage({
          sliderPhoto : body.sliderPhoto
        });
  
        headerImg  = images.save();
      }


      if (!headerImg) {
        return next(new ErrorResponse("add Header Images failed", 400));
      }
      return res.status(200).json({
        success: true,
        message: "Successfully Added",
        data: headerImg,
      });

    } catch (err) {
      return next(new ErrorResponse(err, 400));
    }
};
  
exports.GetHeaderImage = async (req, res, next) => {

    try {
      const headerImg = await HeaderImage.find({})

      if (!headerImg) {
        return next(new ErrorResponse("add Header Images failed", 400));
      }
      return res.status(200).json({
        success: true,
        message: "Successfully Added",
        data: headerImg,
      });
    } catch (err) {
      return next(new ErrorResponse(err, 400));
    }
  };
  