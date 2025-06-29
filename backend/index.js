import express from 'express'
import mongo from './db.js'
import createUserRouter from './routes/createUser.js'
import displayDataRouter from './routes/displayData.js'
import orderRouter from './routes/orderData.js'
import myOrderData from './routes/myorderdata.js'
import { config } from 'dotenv'
import Razorpay from 'razorpay'
import paymentRoute from './routes/paymentRoutes.js'
import cors from 'cors'

config({path : "./config/config.env"})
mongo();  // Function from db.js
const app = express();

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
})

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Updated to match your frontend port
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('/api', createUserRouter);
app.use('/api', displayDataRouter);
app.use('/api', orderRouter);
app.use('/api', myOrderData);
app.use("/api", paymentRoute)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get("/api/getkey", (req, res)=> {
    res.status(200).json({key:process.env.RAZORPAY_API_KEY})
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});
