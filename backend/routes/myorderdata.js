import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { getUserOrders } from '../controllers/orderController.js';

const router = express.Router();

router.get('/myorderdata', verifyToken, getUserOrders);

export default router;
