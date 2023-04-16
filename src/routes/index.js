import express from "express";
import { get, register, login } from "../controllers/UsersController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router =  express.Router();

router.get('/users', verifyToken, get);
router.post('/register', register);
router.post('/login', login);

export default router;