import express from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";

// import controller
import usersController from "../controllers/users.controller.js";
import galleriesController from '../controllers/galleries.controller.js';
import programsController from "../controllers/programs.controller.js";
import teachersController from "../controllers/teachers.controller.js";
import statsController from "../controllers/stats.controller.js";
import ppdbController from "../controllers/ppdb.controller.js";
import profileController from "../controllers/profile.controller.js";

const router =  express.Router();

/*  */
router.get('/v1/ppdb', verifyToken, usersController.get);
router.post('/v1/register', usersController.register);
router.post('/v1/login', usersController.login);
router.delete('/v1/logout', usersController.logout)

/* galleries */
router.post('/v1/galleries', galleriesController.create);
router.get('/v1/galleries', galleriesController.get);
router.put('/v1/galleries/:galleryId', galleriesController.update);
router.get('/v1/galleries/:galleryId', galleriesController.getById);
router.delete('/v1/galleries/:galleryId', galleriesController.deletetById);

/* GET teachers */
router.get('/v1/teachers', teachersController.get);
router.post('/v1/teachers', teachersController.create);
router.put('/v1/teachers/:teacherId', teachersController.update);
router.get('/v1/teachers/:teacherId', teachersController.getById);

/*  programs */
router.get('/v1/programs', programsController.get)
router.post('/v1/programs', programsController.create)
router.put('/v1/programs/:programId', programsController.update)
router.delete('/v1/programs/:programId', programsController.deleteById)
router.get('/v1/programs/:programId', programsController.getById)

/* Stats */
router.get('/v1/stats', statsController.get)

/* PPDB */
router.post('/v1/ppdb', ppdbController.create)

/* Profile */
router.get('/v1/profile/:userId', verifyToken, profileController.getById)
router.put('/v1/profile/:userId', verifyToken, profileController.update)

export default router;