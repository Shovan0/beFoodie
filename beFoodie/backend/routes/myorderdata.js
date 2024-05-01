import express from 'express';
const router = express.Router();
import Order from '../models/Orders.js'; // Assuming this is your Order model

router.post("/myorderdata", async (req, res) => {
    try {
        const userEmail = req.body.email;
        const orderData = await Order.findOne({ email: userEmail });
        res.json({ orderData });
    } catch (error) {
        console.error("Error fetching order data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;












// try {
//     const data = await Order.findOne({ email: req.body.email });
    
//     if (data) {
//         const orderData = data.orderData ? data.orderData.slice(0).reverse() : [];
//         res.json(orderData);
//     } else {
//         res.json([]); // Sending an empty array if no data found
//     }
// } catch(error) {
//     console.error("Error fetching order data:", error);
//     res.status(500).json({ error: "Internal server error" });
// }
