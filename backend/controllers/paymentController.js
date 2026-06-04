import instance from "../razorpayClient.js"
import crypto from "crypto"
import Order from '../models/Orders.js'
import Cart from '../models/Cart.js'
import mongoose from 'mongoose'


export const checkOut = async (req, res)=> {
    const options = {
        amount: Number(req.body.totalPrice * 100),
        currency: "INR",
        notes: {
            email: req.user?.user?.email || ''
        }
    }
    try {
        const order = await instance.orders.create(options);
        res.status(200).json({success : true, order})
    } catch (error) {
        console.error('paymentController.checkOut:', error.message)
        res.status(400).json({success : false})
    }
}

export const paymentVerification = async (req, res)=> {

    const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSig = crypto.createHmac("sha256",process.env.RAZORPAY_API_SECRET)
                                .update(body.toString())
                                .digest("Hex");

    if (expectedSig === razorpay_signature) {
        try {
            // fetch razorpay order to get notes (email)
            const razorOrder = await instance.orders.fetch(razorpay_order_id);
            const userEmail = razorOrder?.notes?.email;

            if (userEmail) {
                // get cart for this user
                const cart = await Cart.findOne({ email: userEmail });
                const cartItems = (cart && cart.items) ? cart.items : [];

                if (cartItems.length > 0) {
                    const existingOrder = await Order.findOne({ email: userEmail });
                    if (!existingOrder) {
                        await Order.create({ email: userEmail, orderData: cartItems });
                    } else {
                        await Order.findOneAndUpdate(
                            { email: userEmail },
                            { $push: { orderData: { $each: cartItems } } }
                        );
                    }

                    // clear user's cart
                    await Cart.findOneAndUpdate({ email: userEmail }, { items: [] });
                }
            }

            const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173';
            return res.redirect(`${FRONTEND}/payment-result?status=success&reference=${razorpay_payment_id}`);
        } catch (err) {
            console.error('paymentVerification post-success processing error:', err);
            const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173';
            return res.redirect(`${FRONTEND}/payment-result?status=success&reference=${razorpay_payment_id}`);
        }
    } else {
        const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173';
        return res.redirect(`${FRONTEND}/payment-result?status=failed`);
    }
}