import mongoose from 'mongoose';
import {config} from 'dotenv'
config({path :"./config/config.env"})

const mongo = () => {
    return mongoose.connect(process.env.URL)
        .then(async () => {
            console.log("DB connected!!");
            // Fetch food items and categories
            const foodItems = await mongoose.connection.db.collection("foodItems").find({}).toArray();
            const foodCategory = await mongoose.connection.db.collection("foodCatagory").find({}).toArray();
            return { foodCategory, foodItems };
        })
        .then(({ foodCategory, foodItems }) => {
            // Store the fetched data in global variables
            global.foodItems = foodItems;
            global.foodCatagory = foodCategory;
        })
        .catch(err => {
            console.error(err);
        });
}

export default mongo;
