import express from 'express';
const router = express.Router();

router.post('/fooddata', (req, res) => {
    try {
        res.send([global.foodItems, global.foodCatagory]);
    } catch (error) {
        console.error(error);
        res.send("Server error");
    }
})

export default router;