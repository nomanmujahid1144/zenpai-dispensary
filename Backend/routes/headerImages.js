const express = require('express');
const router = express.Router();
const { 
    AddHeaderImage,
    AddBottomImage,
    GetHeaderImage,
} = require('../controllers/headerimage.controllers')
const checkAuth = require('../middleware/check-auth')

router.post('/addheaderImage' ,  AddHeaderImage)
router.post('/addbottomImage' ,  AddBottomImage)
router.get('/getHeaderImages' ,  GetHeaderImage)


module.exports = router;