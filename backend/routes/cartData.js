import express from "express";
import Cart from "../models/Cart.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/addToCart", verifyToken, async (req, res) => {
  const email = req.user.user.email;
  const { name, qty, size, price } = req.body;

  try {
    let cart = await Cart.findOne({ email });

    const newItem = { name, qty, size, price };

    if (!cart) {
      cart = new Cart({ email, items: [newItem] });
    } else {
      cart.items.push(newItem);
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.get("/getCart", verifyToken, async (req, res) => {
  try {
    const email = req.user.user.email;

    const cart = await Cart.findOne({ email });

    if (!cart) {
      return res.status(200).json({ success: true, cartItems: [] }); // no cart yet
    }

    res.status(200).json({ success: true, cartItems: cart.items });
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/removeFromCart", verifyToken, async (req, res) => {
  const email = req.user.user.email;
  const index = parseInt(req.body.index);

  try {
    const cart = await Cart.findOne({ email });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    if (index < 0 || index >= cart.items.length) {
      return res.status(400).json({ success: false, message: "Invalid index" });
    }

    cart.items.splice(index, 1);
    await cart.save();

    res.status(200).json({ success: true, updatedCart: cart.items }); // updatedCart matches frontend usage
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.post("/clearCart", verifyToken, async (req, res) => {
  const email = req.user.user.email;

  try {
    const cart = await Cart.findOne({ email });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.get("/cartCount", verifyToken, async (req, res) => {
  const email = req.user.user.email;

  try {
    const cart = await Cart.findOne({ email });
    if (!cart || !cart.items) {
      return res.status(200).json({ success: true, count: 0 });
    }

    res.status(200).json({ success: true, count: cart.items.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


export default router;
