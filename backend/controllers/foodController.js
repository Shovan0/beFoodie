import mongoose from 'mongoose';

export const getFoodData = async (req, res) => {
  try {
    const foodItems = await mongoose.connection.db
      .collection('food_items')
      .find({})
      .toArray();

    const foodCategory = await mongoose.connection.db
      .collection('food_category')
      .find({})
      .toArray();

    return res.json([foodItems, foodCategory]);
  } catch (error) {
    console.error('foodController.getFoodData:', error);
    return res.status(500).send('Server error');
  }
};

export default { getFoodData };
