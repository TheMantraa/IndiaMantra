const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET_KEY || "your_secret_key";

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded; // Store admin data in the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = { verifyAdmin };
