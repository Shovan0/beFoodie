import Order from '../models/Orders.js';

export const createOrder = async (req, res) => {
  const { orderData } = req.body;
  const emailId = req.user.user.email;

  try {
    // Ensure each order item has an img field; if missing, try to lookup via Order model connection
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
      await Order.create({ email: emailId, orderData: enrichedOrderData });
    } else {
      await Order.findOneAndUpdate(
        { email: emailId },
        { $push: { orderData: { $each: enrichedOrderData } } }
      );
    }

    return res.json({ success: true });
  } catch (error) {
    console.error('orderController.createOrder:', error.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userEmail = req.user.user.email;
    if (!userEmail) {
      return res.status(400).json({ error: 'Email not found in token' });
    }
    const orderData = await Order.findOne({ email: userEmail }).select('orderData');
    if (orderData) {
      return res.json({ orderData });
    } else {
      return res.json({ msg: 'No order data found' });
    }
  } catch (error) {
    console.error('orderController.getUserOrders:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default { createOrder, getUserOrders };
