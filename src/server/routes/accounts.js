const express = require("express");
const Account = require("../models/Account");

const accountsRouter = express.Router();

const authRouter = require("./auth");
accountsRouter.use("/", authRouter);

// Get all accounts
accountsRouter.get("/", async (req, res) => {
  try {
    const accounts = await Account.find();
    accountsFiltered = accounts.map(account => {
      accountsFiltered = {
        _id: account._id,
        name: account.name,
        role: account.role,
        description: account.description
      };
      return accountsFiltered;
    });

    res.json(accountsFiltered);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get specific account
accountsRouter.get("/:accountId", async (req, res) => {
  try {
    const account = await Account.findById(req.params.accountId);

    accountFiltered = {
      _id: account._id,
      name: account.name,
      role: account.role,
      description: account.description
    };

    res.json(accountFiltered);
  } catch (err) {
    res.status(204).send("Account not found");
  }
});

// Delete an account
accountsRouter.delete("/:accountId", async (req, res) => {
  try {
    const removedAccount = await Account.deleteOne({
      _id: req.params.accountId
    });
    res.json(removedAccount);
  } catch (err) {
    res.status(204).json({ message: "Account not found" });
  }
});

// Update an account
accountsRouter.patch("/:accountId", async (req, res) => {
  try {
    const updateAccount = await Account.updateOne(
      { _id: req.params.accountId },
      { $set: { name: req.body.name } }
    );
    res.json(updateAccount);
  } catch (err) {
    res.status(204).send("Account not found");
  }
});

module.exports = accountsRouter;
