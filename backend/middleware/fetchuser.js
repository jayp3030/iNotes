const jwt = require("jsonwebtoken");
const JWT_SECRET = "JayisagoodB$oy";

const fetchuser = (req, res, next) => {
  // get user from jwt token and add id to req object

  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({ error: "please authenticate using valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate using valid token" });
  }
};

module.exports = fetchuser;
