import express from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";

// import controller
import usersController from "../controllers/users.controller.js";
import galleriesController from '../controllers/galleries.controller.js';

const router =  express.Router();

/*  */
router.get('/users', verifyToken, usersController.get);
router.post('/register', usersController.register);
router.post('/login', usersController.login);

/* POST galleries */
router.post('/v1/galleries', galleriesController.create);
router.get('/v1/galleries', galleriesController.get);

export default router;
