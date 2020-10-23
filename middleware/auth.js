const jwt = require("jsonwebtoken");
require('dotenv').config()

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization").split(" ");
  const token = authHeader[1];
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
