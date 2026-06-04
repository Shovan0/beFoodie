import mongoose from 'mongoose'
const {Schema} = mongoose;

const orderItemSchema = new Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  size: { type: String },
  price: { type: Number, required: true },
    img: { type: String },
    paymentId: { type: String },
}, { _id: false });

const orderSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    orderData: {
        type: [orderItemSchema],
        required: true,
    },
    amount: { type: Number }, // amount in rupees
    paymentId: { type: String },
    paid: { type: Boolean, default: false },
    orderDate: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('order', orderSchema);