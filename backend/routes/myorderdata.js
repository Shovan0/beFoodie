import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import Order from '../models/Orders.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const JWT_SECRET = process.env.JWT_SECRET; 

router.get("/myorderdata",verifyToken, async (req, res) => {
  try {
    const userEmail = req.user.user.email;
    if (!userEmail) {
      return res.status(400).json({ error: "Email not found in token" });
    }
    const orderData = await Order.findOne({ email: userEmail }).select("orderData");
    if (orderData) {
      res.json({ orderData });
    } else {
      res.json({ msg: "No order data found" });
    }
  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
