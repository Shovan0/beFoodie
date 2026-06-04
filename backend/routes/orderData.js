import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/orderdata', verifyToken, createOrder);

export default router;
