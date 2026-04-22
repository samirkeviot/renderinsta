const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const authmiddleware = (req, res, next) => {
  try {
    const authheader = req.headers.authorization;

    if (!authheader || !authheader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authheader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authmiddleware;
