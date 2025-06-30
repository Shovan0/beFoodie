import { instance } from "../index.js"
import {config} from "dotenv";
import crypto from "crypto"
config({path : "../config/config.env"})


export const checkOut = async (req, res)=> {
    const options = {
        amount: Number(req.body.totalPrice * 100),
        currency: "INR"
    }
    try {
        const order = await instance.orders.create(options);
        res.status(200).json({success : true, order})
    } catch (error) {
        console.log("controller line 17 ",error)
        res.status(400).json({success : false})
    }
}

export const paymentVerification = async (req, res)=> {

    const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSig = crypto.createHmac("sha256",process.env.RAZORPAY_API_SECRET)
                                .update(body.toString())
                                .digest("Hex");
    // console.log("Expected ", expectedSig);
    // console.log("Razorpay sig ", razorpay_signature);

    if(expectedSig === razorpay_signature)  {


        res.redirect(`http://localhost:5173/paymentverification?reference=${razorpay_payment_id}`)
    }
    else  {
        res.status(400).json({success: false});
    }
}