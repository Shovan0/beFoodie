import express from 'express';
const router = express.Router();
import {checkOut, paymentVerification} from '../controllers/paymentController.js'

router.post("/checkout", checkOut);
router.post("/paymentverification", paymentVerification);

export default router;