import express from 'express';
import { create } from '../controllers/galleries.controller.js';

const router =  express.Router();

/* POST galleries */
router.post('/v1/galleries', create);


export default router;
