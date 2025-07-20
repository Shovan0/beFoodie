import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
}, { _id: false }); // no _id needed per item

const cartSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  items: [cartItemSchema],
});

export default mongoose.model("Cart", cartSchema);
