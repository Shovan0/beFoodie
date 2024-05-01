import express from 'express'
import mongo from './db.js'
import createUserRouter from './routes/createUser.js'
import displayDataRouter from './routes/displayData.js'
import orderRouter from './routes/orderData.js'
import myOrderData from './routes/myorderdata.js'

mongo();  // Function from db.js
const app = express();
const port = 5000;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Updated to match your frontend port
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


app.use(express.json());
app.use('/api', createUserRouter);
app.use('/api', displayDataRouter);
app.use('/api', orderRouter);
app.use('/api', myOrderData);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
