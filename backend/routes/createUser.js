import express from 'express';
const router = express.Router();
import User from '../models/User.js'
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

router.post("/createuser"
    ,
    [body("email", "Email is not valid").isEmail(),
    body("password", "min 5 length password").isLength({ min: 5 })]
    ,
    body('email').custom(async value => {
        const user = await User.findUserByEmail(value);
        if (user) {
            throw new Error('E-mail already in use');
        }
    })
    , async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        try {
            const { name, password, email, location } = req.body;

            if (!name || !password || !email || !location) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }
            User.create({
                name, password: secPass, email, location
            })
            res.json({ success: true })
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    })

router.post("/login",
    [body("email", "Email is not valid").isEmail()],
    async (req, res, next) => {
        const jwtSecret = process.env.JWT_SECRET;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }
        try {
            let userData = await User.findOne({ email: req.body.email });
            if (!userData) {
                return res.json({ error: "Invalid email or password" });
            }
            const check = await bcrypt.compare(req.body.password, userData.password);
            if (!check) {
                console.log(check);
                return res.json({ error: "Invalid email or password" });
            }
            const data = {
                user: {
                    id: userData.id,
                    email: userData.email
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken: authToken })
        } catch (error) {
            console.log(error);
            return res.json({ success: false })
        }
    })

export default router;