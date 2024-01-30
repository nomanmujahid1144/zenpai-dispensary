const express = require("express");
const multer = require("multer");
const path            = require('path');
const fs            = require('fs');
const ErrorResponse = require('../utils/errorResponse');
const Product = require('../models/Product');

const {
  addBanner,
  getAllBanners,
  getSingleBanner,
  deleteBanner,
  updateBanner,
} = require("../controllers/categoryBanner.controller");
const router = express.Router();


router.post("/addbanner",  addBanner);
router.get("/getBanners", getAllBanners);
router.get("/getsinglebanner", getSingleBanner);
router.delete("/deletebanner", deleteBanner);
router.patch("/updatebanner", updateBanner);

module.exports = router;
