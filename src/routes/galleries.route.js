const express = require('express');
const router = express.Router();
const galleriesController = require('../controllers/galleries.controller');
  
/* POST galleries */
router.post('/', galleriesController.create);

module.exports = router;
