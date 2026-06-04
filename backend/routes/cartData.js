import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  cartCount,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/addToCart", verifyToken, addToCart);
router.get("/getCart", verifyToken, getCart);
router.post("/removeFromCart", verifyToken, removeFromCart);
router.post("/clearCart", verifyToken, clearCart);
router.get("/cartCount", verifyToken, cartCount);

export default router;
