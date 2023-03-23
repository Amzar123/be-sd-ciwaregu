const express = require('express');
const router = express.Router();
const galleriesController = require('../controllers/galleries.controller');

/* GET programming languages. */
router.get('/', galleriesController.get);
  
/* POST programming language */
router.post('/', galleriesController.create);

module.exports = router;
