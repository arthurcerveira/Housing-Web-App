const express = require("express");
const verify = require("./verifyToken");
const Account = require("../models/Account");

const loggedRouter = express.Router();

loggedRouter.get("/", verify, async (req, res) => {
  try {
    const account = await Account.findById(req.account._id);
    res.json(account);
  } catch (err) {
    res.status(204).send("Account not found");
  }
});

module.exports = loggedRouter;
