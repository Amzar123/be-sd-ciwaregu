import express from "express";
import { verifyToken, adminVerifyToken } from "../middlewares/VerifyToken.js";

// import controller
import usersController from "../controllers/users.controller.js";
import galleriesController from '../controllers/galleries.controller.js';
import programsController from "../controllers/programs.controller.js";
import teachersController from "../controllers/teachers.controller.js";
import statsController from "../controllers/stats.controller.js";
import ppdbController from "../controllers/ppdb.controller.js";
import profileController from "../controllers/profile.controller.js";
import studentsController from "../controllers/students.controller.js";

const router =  express.Router();

/*  */
router.post('/v1/register', usersController.register);
router.post('/v1/login', usersController.login);
/* router.delete('/v1/logout', usersController.logout) */

/* galleries */
router.post('/v1/galleries', adminVerifyToken ,galleriesController.create);
router.get('/v1/galleries', galleriesController.get);
router.put('/v1/galleries/:galleryId', adminVerifyToken ,galleriesController.update);
router.get('/v1/galleries/:galleryId', galleriesController.getById);
router.delete('/v1/galleries/:galleryId', adminVerifyToken, galleriesController.deleteById);

/* GET teachers */
router.get('/v1/teachers', teachersController.get);
router.post('/v1/teachers', adminVerifyToken, teachersController.create);
router.put('/v1/teachers/:teacherId', teachersController.update);
router.get('/v1/teachers/:teacherId', teachersController.getById);
router.delete('/v1/teachers/:teacherId', adminVerifyToken, teachersController.deleteById);

/*  programs */
router.get('/v1/programs', programsController.get)
router.post('/v1/programs', adminVerifyToken, programsController.create)
router.put('/v1/programs/:programId', adminVerifyToken, programsController.update)
router.delete('/v1/programs/:programId', adminVerifyToken, programsController.deleteById)
router.get('/v1/programs/:programId', programsController.getById)

/* Stats */
router.get('/v1/stats', statsController.get)

/* PPDB */
router.post('/v1/ppdb', ppdbController.create)
// kade verify token admin
router.get('/v1/ppdb', ppdbController.get)
router.get('/v1/ppdb/:candidateId', ppdbController.getById)
router.put('/v1/verifiedPpdb/:candidateId', ppdbController.update)
router.get('/v1/hasilPpdb', ppdbController.getByStatus)

/* Students (Admin) */
router.get('/v1/students', studentsController.get)
router.get('/v1/students/:studentId', studentsController.getById)

/* Profile */
router.get('/v1/profile/:userId', verifyToken, profileController.getById)
router.put('/v1/profile/:userId', verifyToken, profileController.update)

export default router;