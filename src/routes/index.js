import express from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";

// import controller
import usersController from "../controllers/users.controller.js";
import galleriesController from '../controllers/galleries.controller.js';
import programsController from "../controllers/programs.controller.js";
import teachersController from "../controllers/teachers.controller.js";
import statsController from "../controllers/stats.controller.js";

const router =  express.Router();

/*  */
router.get('/v1/users', verifyToken, usersController.get);
router.post('/v1/register', usersController.register);
router.post('/v1/login', usersController.login);

/* POST galleries */
router.post('/v1/galleries', galleriesController.create);
router.get('/v1/galleries', galleriesController.get);

/* GET programs */
router.get('/v1/programs', programsController.get)

/* GET teachers */
router.get('/v1/teachers', teachersController.get)
router.post('/v1/teachers', teachersController.create)

/* GET Stats */
router.get('/v1/stats', statsController.get)
export default router;
