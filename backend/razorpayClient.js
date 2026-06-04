import Razorpay from 'razorpay'
import { config } from 'dotenv'

config({ path: './config/config.env' })

const keyId = process.env.RAZORPAY_API_KEY || ''
const keySecret = process.env.RAZORPAY_API_SECRET || ''

// Log masked info for debugging (do not print full secrets)
const mask = (s) => (s ? `${s.slice(0,4)}...(${s.length})` : 'undefined')
console.log('Razorpay keys loaded:', { keyId: mask(keyId), keySecret: mask(keySecret) })

const instance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
})

export default instance
