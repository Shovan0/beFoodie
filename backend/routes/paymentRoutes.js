import instance from "../razorpayClient.js"
import express from 'express';
const router = express.Router();
import {checkOut, paymentVerification} from '../controllers/paymentController.js'
import { verifyToken } from '../middlewares/verifyToken.js'


router.post("/checkout", verifyToken, checkOut);
router.post("/paymentverification", paymentVerification);

export default router;