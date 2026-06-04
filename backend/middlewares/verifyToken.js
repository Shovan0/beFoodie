import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Accept token from HttpOnly cookie or Authorization header
  const cookieToken = req.cookies?.authToken;
  const headerToken = req.headers.authorization?.split(" ")[1];
  const token = cookieToken || headerToken;

  if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
