const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

  const token = req.headers.authorization.split(' ')[1];
  // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
  // const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    // const token = req.headers.authorization.split(' ')[1];
    // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    console.log('token', token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded', decoded)
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};