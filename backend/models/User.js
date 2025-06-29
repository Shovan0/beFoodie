import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

userSchema.statics.findUserByEmail = async function(email) {
    return await this.findOne({ email });
  };
   
  
export default mongoose.model('User', userSchema);;