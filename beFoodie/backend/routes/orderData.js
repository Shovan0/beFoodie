import express from 'express';
const router = express.Router();
import Order from '../models/Orders.js'

router.post("/orderdata", async (req, res)=>  {
    let data = req.body.orderData;
    // await data.slice(0, 0, {orderDate : req.body.orderDate})

    // console.log("This is the User Email : ", req.body.email)
    let emailId = await Order.findOne({email : req.body.email})
    console.log(emailId)
    if(emailId == null)  {
        try {
            await Order.create({
                email: req.body.email,
                orderData: [data]
            }).then(()=>{
                res.json({success: true});
            })
        } catch (error) {
            console.log("orderData.js line 21",error.message);
            res.send("Server error", error.message)
        }
    }
    else {
        try {
            await Order.findOneAndUpdate({email: req.body.email},
            { $push:{orderData: data}}).then(()=>{
                res.json({success: true})
            })
        } catch (error) {
            res.send("Server Error", error.message)
        }
    }
})

export default router;