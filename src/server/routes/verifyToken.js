const jwt = require("jsonwebtoken");
const Account = require("../models/Account");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ error: "Access denied" });

  // authHeader = Bearer {token}
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, account) => {
    // If there was an error, return
    if (err) return res.status(403).json({ error: "Invalid token" });

    // If the account doesn't exist, return
    const acc = await Account.findById(account._id);
    if (acc === null) return res.json({ error: "Account not found" });

    // Else, add account to request
    req.account = account;
    next();
  });
};
