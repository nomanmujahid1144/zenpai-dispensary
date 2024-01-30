const ErrorResponse = require('../utils/errorResponse');
const SocialLinks = require('../models/SocialLinks');
const mongoose = require('mongoose');



exports.AddSocialLinks = async (req, res, next) => {
    try {
  
      let body = req.body;
      console.log(body)
      const findImage = await SocialLinks.find({})

      let sociallinks ; 
      
      if(findImage.length > 0){
        sociallinks  =await  SocialLinks.findByIdAndUpdate({_id : mongoose.Types.ObjectId(findImage[0]._id)} , body)
      }else{
        const links = new SocialLinks({
          ...body
        });
  
        sociallinks  = links.save();
      }


      if (!sociallinks) {
        return next(new ErrorResponse("add Soical Links failed", 400));
      }
      return res.status(200).json({
        success: true,
        message: "Successfully Added Soical Links",
        data: sociallinks,
      });

    } catch (err) {
      return next(new ErrorResponse(err, 400));
    }
};

exports.GetSoicalLinks = async (req, res, next) => {

    try {
      const sociallinks = await SocialLinks.find({})

      console.log(sociallinks, 'getSocialLinks')

      if (!sociallinks) {
        return next(new ErrorResponse("No Social Links", 400));
      }
      
      return res.status(200).json({
        success: true,
        message: "All Social Links",
        data: sociallinks.length > 0 ? sociallinks[0] : {}
      });
    } catch (err) {
      return next(new ErrorResponse(err, 400));
    }
  };
  