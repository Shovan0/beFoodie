import express from 'express';
import { getAddress, saveAddress } from '../controllers/addressController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/address', verifyToken, getAddress);
router.post('/address', verifyToken, saveAddress);

export default router;
