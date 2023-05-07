import express from "express";
import { get, register, login } from "../controllers/UsersController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { create } from '../controllers/galleries.controller.js';

const router =  express.Router();

router.get('/users', verifyToken, get);
router.post('/register', register);
router.post('/login', login);

/* POST galleries */
router.post('/v1/galleries', create);

export default router;
