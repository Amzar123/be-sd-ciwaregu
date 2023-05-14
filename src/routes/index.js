import express from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";

// import controller
import usersController from "../controllers/users.controller.js";
import galleriesController from '../controllers/galleries.controller.js';
import programsController from "../controllers/programs.controller.js";
import teachersController from "../controllers/teachers.controller.js";
import statsController from "../controllers/stats.controller.js";
import ppdbController from "../controllers/ppdb.controller.js";

const router =  express.Router();

/*  */
router.get('/v1/ppdb', verifyToken, usersController.get);
router.post('/v1/register', usersController.register);
router.post('/v1/login', usersController.login);

/* galleries */
router.post('/v1/galleries', galleriesController.create);
router.get('/v1/galleries', galleriesController.get);
router.put('/v1/galleries/:galleryId', galleriesController.update);
router.get('/v1/galleries/:galleryId', galleriesController.getById);
router.delete('/v1/galleries/:galleryId', galleriesController.deletetById);

/*  programs */
router.get('/v1/programs', programsController.get)
router.post('/v1/programs', programsController.create)
router.put('/v1/programs/:programId', programsController.update)
router.delete('/v1/programs/:programId', programsController.deleteById)

/* teachers */
router.get('/v1/teachers', teachersController.get)
router.post('/v1/teachers', teachersController.create)

/* Stats */
router.get('/v1/stats', statsController.get)

/* PPDB */
router.post('/v1/ppdb', ppdbController.create)

export default router;
