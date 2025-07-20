import express from 'express';
import Order from '../models/Orders.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/orderdata", async (req, res) => {
  const { orderData } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const emailId = decoded.user.email;

    const existingOrder = await Order.findOne({ email: emailId });

    if (!existingOrder) {
      await Order.create({
      email: emailId,
      orderData: orderData  
    });

    } else {
        await Order.findOneAndUpdate(
        { email: emailId },
        { $push: { orderData: { $each: orderData } } }
    );
    }

    return res.json({ success: true });
  } catch (error) {
    console.error("orderData.js:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
