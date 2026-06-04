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

    // Create a new order document for this checkout (unpaid until payment verification)
    await Order.create({ email: emailId, orderData: enrichedOrderData, paid: false });

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
    const orders = await Order.find({ email: userEmail }).sort({ orderDate: -1 });
    return res.json({ orders });
  } catch (error) {
    console.error('orderController.getUserOrders:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default { createOrder, getUserOrders };
