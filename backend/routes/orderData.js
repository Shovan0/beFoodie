import express from 'express';
import Order from '../models/Orders.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post("/orderdata", verifyToken, async (req, res) => {
  const { orderData } = req.body;
  const emailId = req.user.user.email;

  try {
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
