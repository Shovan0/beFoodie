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

    console.log('paymentVerification called with body:', { razorpay_payment_id, razorpay_order_id });

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSig = crypto.createHmac("sha256",process.env.RAZORPAY_API_SECRET)
                                .update(body.toString())
                                .digest("Hex");

    const verified = expectedSig === razorpay_signature;
    console.log('expectedSig:', expectedSig, 'receivedSig:', razorpay_signature, 'verified:', verified);

    if (verified) {
        try {
            // fetch razorpay order to get notes (email)
            const razorOrder = await instance.orders.fetch(razorpay_order_id);
            const userEmail = razorOrder?.notes?.email;

            console.log('razorOrder id/amount/notes:', { id: razorOrder?.id, amount: razorOrder?.amount, notes: razorOrder?.notes });
            console.log('Derived userEmail from razorOrder notes:', userEmail);

            if (userEmail) {
                // get cart for this user
                const cart = await Cart.findOne({ email: userEmail });
                const cartItems = (cart && cart.items) ? cart.items : [];

                if (cartItems.length > 0) {
                    // fetch payment details to record amount (in paise)
                    let paidAmount = null;
                    try {
                        const payment = await instance.payments.fetch(razorpay_payment_id);
                        paidAmount = payment?.amount || null;
                    } catch (e) {
                        paidAmount = razorOrder?.amount || null;
                    }

                    const amountInRupees = paidAmount ? Number(paidAmount) / 100 : undefined;

                    // attach paymentId to each item so older schemas with arrays also carry id
                    const itemsWithPayment = cartItems.map(item => ({ ...item.toObject ? item.toObject() : item, paymentId: razorpay_payment_id }));

                    await Order.create({
                        email: userEmail,
                        orderData: itemsWithPayment,
                        paymentId: razorpay_payment_id,
                        paid: true,
                        amount: amountInRupees,
                    });

                    // clear user's cart
                    const cartUpdate = await Cart.findOneAndUpdate({ email: userEmail }, { items: [] });
                    console.log('Cart cleared result:', !!cartUpdate);
                }
            }

            // if request expects JSON, return JSON; otherwise redirect
            if (req.is('application/json')) {
                return res.json({ success: true, reference: razorpay_payment_id });
            }

            const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173';
            return res.redirect(`${FRONTEND}/payment-result?status=success&reference=${razorpay_payment_id}`);
        } catch (err) {
            console.error('paymentVerification post-success processing error:', err);
            if (req.is('application/json')) {
                return res.status(500).json({ success: false, error: 'post-processing failed' });
            }
            const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173';
            return res.redirect(`${FRONTEND}/payment-result?status=success&reference=${razorpay_payment_id}`);
        }
    } else {
        const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173';
        return res.redirect(`${FRONTEND}/payment-result?status=failed`);
    }
}