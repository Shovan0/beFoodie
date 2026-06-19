import express from 'express'
import mongo from './db.js'
import mongoose from 'mongoose'
import createUserRouter from './routes/createUser.js'
import displayDataRouter from './routes/displayData.js'
import orderRouter from './routes/orderData.js'
import myOrderData from './routes/myorderdata.js'
import cartData from './routes/cartData.js'
import { config } from 'dotenv'
import Razorpay from 'razorpay'
import paymentRoute from './routes/paymentRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import addressRoute from './routes/address.js'
config({path : "./config/config.env"})
// connect to MongoDB and run a small migration to remove any accidental unique index on orders.email
mongo().then(async () => {
    try {
        const coll = mongoose.connection.db.collection('orders');
        const indexes = await coll.indexes();
        for (const idx of indexes) {
            if (idx.key && idx.key.email === 1 && idx.unique) {
                await coll.dropIndex(idx.name);
                console.log('Dropped unique index on orders.email:', idx.name);
            }
        }
    } catch (err) {
        // If the collection doesn't exist yet, ignore the error
        if (err && err.codeName === 'NamespaceNotFound') {
            console.log('orders collection not found yet; skipping index migration');
        } else {
            console.error('Index migration error (non-fatal):', err);
        }
    }
}).catch(err => {
    console.error('Mongo connect error during index migration:', err);
});
const app = express();
import instance from './razorpayClient.js'
const FRONTEND_URL = process.env.FRONTEND_URL;

const allowedOrigins = [
    'http://localhost:5173',
].concat(FRONTEND_URL ? [FRONTEND_URL] : []).filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.length === 0 || allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        console.warn('CORS: origin not in allowlist, echoing to allow during runtime:', origin);
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization','X-Requested-With']
}));

// Handle preflight globally
app.options('*', cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('/api', createUserRouter);
app.use('/api', displayDataRouter);
app.use('/api', orderRouter);
app.use('/api', myOrderData);
app.use("/api", paymentRoute);
app.use("/api", cartData);
app.use('/api', addressRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get("/api/getkey", (req, res)=> {
    res.status(200).json({key:process.env.RAZORPAY_API_KEY})
})

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Kill the process using that port or set a different PORT.`);
        process.exit(1);
    }
    console.error('Server error:', err);
    process.exit(1);
});
