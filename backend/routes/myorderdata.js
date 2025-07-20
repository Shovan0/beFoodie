import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import Order from '../models/Orders.js';

const JWT_SECRET = process.env.JWT_SECRET; 

router.get("/myorderdata", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const userEmail = decoded.user.email;
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
