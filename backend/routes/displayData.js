import express from "express";
import { getFoodData } from "../controllers/foodController.js";

const router = express.Router();

router.post("/fooddata", getFoodData);

export default router;
