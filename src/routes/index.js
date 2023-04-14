import express from "express";
import { get, create } from "../controllers/UsersController.js";

const router =  express.Router();

router.get('/users', get);
router.post('/users', create);

export default router;