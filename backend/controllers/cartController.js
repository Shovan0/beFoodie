import Cart from '../models/Cart.js';
import mongoose from 'mongoose';

export const addToCart = async (req, res) => {
  const email = req.user.user.email;
  const { name, qty, size, price, img } = req.body;

  try {
    let cart = await Cart.findOne({ email });

    // prefer provided image; otherwise try to lookup from food_items collection
    let itemImg = img;
    try {
      if (!itemImg) {
        const found = await mongoose.connection.db
          .collection('food_items')
          .findOne({ name: name });
        if (found && (found.img || found.image)) {
          itemImg = found.img || found.image;
        }
      }
    } catch (lookupErr) {
      console.error('Image lookup failed', lookupErr);
    }

    const newItem = { name, qty, size, price, img: itemImg };

    if (!cart) {
      cart = new Cart({ email, items: [newItem] });
    } else {
      cart.items.push(newItem);
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const getCart = async (req, res) => {
  try {
    const email = req.user.user.email;

    const cart = await Cart.findOne({ email });

    if (!cart) {
      return res.status(200).json({ success: true, cartItems: [] });
    }

    res.status(200).json({ success: true, cartItems: cart.items });
  } catch (error) {
    console.error('cartController.getCart:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const removeFromCart = async (req, res) => {
  const email = req.user.user.email;
  const index = parseInt(req.body.index);

  try {
    const cart = await Cart.findOne({ email });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    if (index < 0 || index >= cart.items.length) {
      return res.status(400).json({ success: false, message: 'Invalid index' });
    }

    cart.items.splice(index, 1);
    await cart.save();

    res.status(200).json({ success: true, updatedCart: cart.items });
  } catch (err) {
    console.error('cartController.removeFromCart:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const clearCart = async (req, res) => {
  const email = req.user.user.email;

  try {
    const cart = await Cart.findOne({ email });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    cart.items = [];
    await cart.save();

    res.status(200).json({ success: true, message: 'Cart cleared' });
  } catch (err) {
    console.error('cartController.clearCart:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const cartCount = async (req, res) => {
  const email = req.user.user.email;

  try {
    const cart = await Cart.findOne({ email });
    if (!cart || !cart.items) {
      return res.status(200).json({ success: true, count: 0 });
    }

    res.status(200).json({ success: true, count: cart.items.length });
  } catch (err) {
    console.error('cartController.cartCount:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export default { addToCart, getCart, removeFromCart, clearCart, cartCount };
