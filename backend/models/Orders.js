import mongoose from 'mongoose'
const {Schema} = mongoose;

const orderItemSchema = new Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  size: { type: String },
  price: { type: Number, required: true },
  img: { type: String },
}, { _id: false });

const orderSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    orderData: {
        type: [orderItemSchema],
        required: true
    },
    orderDate:{
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('order', orderSchema);