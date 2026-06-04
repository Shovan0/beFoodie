import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  try {
    const { name, password, email, location } = req.body;

    if (!name || !password || !email || !location) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    await User.create({ name, password: hashed, email, location });
    return res.json({ success: true });
  } catch (error) {
    console.error('authController.registerUser:', error);
    return res.status(500).json({ success: false });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) return res.status(400).json({ error: 'Invalid email or password' });
    const match = await bcrypt.compare(password, userData.password);
    if (!match) return res.status(400).json({ error: 'Invalid email or password' });

    const payload = { user: { id: userData.id, email: userData.email } };
    const authToken = jwt.sign(payload, JWT_SECRET);

    const isProd = process.env.NODE_ENV === 'production';
    // Set HttpOnly cookie with sensible defaults
    res.cookie('authToken', authToken, {
      httpOnly: true,
    //   secure: isProd,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({ success: true });
  } catch (error) {
    console.error('authController.loginUser:', error);
    return res.status(500).json({ success: false });
  }
};

export const logout = async (req, res) => {
  try {
    const isProd = process.env.NODE_ENV === 'production';
    res.clearCookie('authToken', { httpOnly: true, secure: isProd, sameSite: 'Strict' });
    return res.json({ success: true });
  } catch (error) {
    console.error('authController.logout:', error);
    return res.status(500).json({ success: false });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user || !req.user.user) return res.status(401).json({ success: false });
    return res.json({ success: true, user: req.user.user });
  } catch (error) {
    console.error('authController.getCurrentUser:', error);
    return res.status(500).json({ success: false });
  }
};

export default { registerUser, loginUser };
