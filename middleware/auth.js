const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //Get the tekn from the header
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token authorised" });
  }

  // verify
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch {
    res.status(401).json({ msg: "token is not valid" });
  }
};
