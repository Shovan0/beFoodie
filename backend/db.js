import mongoose from 'mongoose';
import { config } from 'dotenv';
config({ path: "./config/config.env" });

const mongo = () => {
  return mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(async () => {
      console.log("DB connected!!");

      // Fetch data
      const foodItems = await mongoose.connection.db
        .collection("food_items")
        .find({})
        .toArray();

      const foodCategory = await mongoose.connection.db
        .collection("food_category")
        .find({})
        .toArray();

    //   console.log("Fetched food items:", foodItems.length);
    //   console.log("Fetched food categories:", foodCategory.length);

      // Store in global variables
      global.foodItems = foodItems;
      global.foodCategory = foodCategory;
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};

export default mongo;
