import express from 'express';
const router = express.Router();

router.post('/fooddata', (req, res) => {
  try {
    res.send([global.foodItems, global.foodCategory]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


export default router;