import mongoose, { Schema } from 'mongoose';

const addressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: String, required: true },
  landmark: { type: String },
  houseNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Address', addressSchema);
