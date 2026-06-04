import express from 'express';
const router = express.Router();
import { body, validationResult } from 'express-validator';
import { registerUser, loginUser } from '../controllers/authController.js';
import { getCurrentUser, logout } from '../controllers/authController.js';
import User from '../models/User.js';
import { verifyToken } from '../middlewares/verifyToken.js';

router.post(
    '/createuser',
    [body('email', 'Email is not valid').isEmail(), body('password', 'min 5 length password').isLength({ min: 5 })],
    body('email').custom(async (value) => {
        const user = await User.findUserByEmail(value);
        if (user) {
            throw new Error('E-mail already in use');
        }
    }),
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        // Delegate to controller for registration logic
        return registerUser(req, res);
    }
);

router.post(
  '/login',
  [body('email', 'Email is not valid').isEmail()],
  async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    // Delegate to controller for login logic
    return loginUser(req, res, next);
  }
);

    // Get current user (uses cookie or header token)
    router.get('/me', verifyToken, (req, res) => {
      return getCurrentUser(req, res);
    });

    // Logout (clears cookie) - allow clearing without a valid token
    router.post('/logout', (req, res) => {
      return logout(req, res);
    });

export default router;