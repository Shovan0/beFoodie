import mongoose from 'mongoose'
const {Schema} = mongoose;

const orderSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    orderData: {
        type: Array,
        required: true
    },
    orderDate:{
        type: Date, 
        // default: Date.now()
    }
})

export default mongoose.model('order', orderSchema);