import mongoose from 'mongoose';
import { config } from 'dotenv';
import dns from 'dns';

config({ path: "./config/config.env" });

const resolveSrvWithFallback = async (srvName) => {
  const maxAttempts = 2;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const records = await dns.promises.resolveSrv(srvName);
      return records;
    } catch (err) {
      // On first failure, try using Google DNS as a fallback for this process
      if (i === 0) {
        console.warn(`SRV resolve failed (${err.code}). Trying fallback DNS (8.8.8.8)`);
        try {
          dns.setServers(['8.8.8.8', '8.8.4.4']);
        } catch (e) {
          console.warn('Unable to set DNS servers programmatically:', e.message || e);
        }
        // loop to retry
        continue;
      }
      throw err;
    }
  }
};

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const connectDB = async () => {
  // Detect mongodb+srv URIs and extract the host (handles optional userinfo)
  const srvMatch = process.env.URL && process.env.URL.match(/mongodb\+srv:\/\/(?:[^@]+@)?([^\/\?]+)/i);
  if (srvMatch) {
    const srvHost = srvMatch[1];
    const srvName = `_mongodb._tcp.${srvHost}`;
    try {
      const srv = await resolveSrvWithFallback(srvName);
      console.log('SRV records resolved:', srv.map(r => `${r.name}:${r.port}`));
    } catch (err) {
      console.error('SRV lookup failed before mongoose.connect:', err);
      console.error('Hint: ensure DNS SRV lookups are allowed on your network and Atlas Network Access allows your IP.');
      throw err;
    }
  }

  const maxRetries = 5;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await mongoose.connect(process.env.URL);
      console.log('MongoDB connected!!');
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${attempt} failed:`, err && err.message ? err.message : err);
      if (attempt === maxRetries) {
        console.error("MongoDB connection error: maximum retries reached.");
        throw err;
      }
      const backoff = attempt * 1000;
      console.log(`Retrying in ${backoff}ms...`);
      await sleep(backoff);
    }
  }
};

export default connectDB;
