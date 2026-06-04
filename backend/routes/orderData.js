import express from 'express';
import Order from '../models/Orders.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post("/orderdata", verifyToken, async (req, res) => {
  const { orderData } = req.body;
  const emailId = req.user.user.email;

  try {
    // Ensure each order item has an img field; if missing, try to lookup
    const enrichedOrderData = await Promise.all(
      (orderData || []).map(async (item) => {
        if (item.img) return item;
        try {
          const found = await Order.db.db.collection('food_items').findOne({ name: item.name });
          const img = found && (found.img || found.image) ? (found.img || found.image) : null;
          return { ...item, img };
        } catch (e) {
          return item;
        }
      })
    );

    const existingOrder = await Order.findOne({ email: emailId });

    if (!existingOrder) {
      await Order.create({
        email: emailId,
        orderData: enrichedOrderData
      });
    } else {
      await Order.findOneAndUpdate(
        { email: emailId },
        { $push: { orderData: { $each: enrichedOrderData } } }
      );
    }

    return res.json({ success: true });
  } catch (error) {
    console.error("orderData.js:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
