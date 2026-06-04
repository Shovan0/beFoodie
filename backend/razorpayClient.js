import Razorpay from 'razorpay'
import { config } from 'dotenv'

config({ path: './config/config.env' })

const keyId = process.env.RAZORPAY_API_KEY || ''
const keySecret = process.env.RAZORPAY_API_SECRET || ''

// Mask function retained for potential debugging; do not log secrets in production
const mask = (s) => (s ? `${s.slice(0,4)}...(${s.length})` : 'undefined')

const instance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
})

export default instance
