const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ error: "Access denied" });

  // authHeader = Bearer {token}
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET, (err, account) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.account = account;
    next();
  });
};
