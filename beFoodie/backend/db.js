import mongoose from 'mongoose';

const URL = "mongodb://127.0.0.1:27017/beFoodie"

const mongo = () => {
    return mongoose.connect(URL)
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
