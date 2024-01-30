const express = require('express');
const router = express.Router();
const { 
    AddSocialLinks,
    GetSoicalLinks
} = require('../controllers/socialLinks.controllers')
const checkAuth = require('../middleware/check-auth')

router.post('/add-social-link' ,  AddSocialLinks)
router.get('/get-soical-links' ,  GetSoicalLinks)


module.exports = router;