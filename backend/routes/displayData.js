import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.post("/fooddata", async (req, res) => {
  try {
    const foodItems = await mongoose.connection.db
      .collection("food_items")
      .find({})
      .toArray();

    const foodCategory = await mongoose.connection.db
      .collection("food_category")
      .find({})
      .toArray();

    res.json([foodItems, foodCategory]);
  } catch (error) {
    console.error("Error fetching food data:", error);
    res.status(500).send("Server error");
  }
});

export default router;
