const express = require("express");
const Account = require("../models/Account");

const router = express.Router();

// Get all accounts
router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.json({ message: error });
  }
});

// Get specific account
router.get("/:accountId", async (req, res) => {
  try {
    const account = await Account.findById(req.params.accountId);
    res.json(account);
  } catch (err) {
    res.status(404).send("Account not found");
  }
});

// Create an account
router.post("/", async (req, res) => {
  const account = new Account({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    description: req.body.description,
    role: req.body.role
  });

  try {
    const savedAccount = await account.save();
    res.json(savedAccount);
  } catch (err) {
    res.json({ message: error });
  }
});

// Delete an account
router.delete("/:accountId", async (req, res) => {
  try {
    const removedAccount = await Account.remove({ _id: req.params.accountId });
    res.json(removedAccount);
  } catch (err) {
    res.status(404).send("Account not found");
  }
});

// Update an account
router.patch("/:accountId", async (req, res) => {
  try {
    const updateAccount = await Account.updateOne(
      { _id: req.params.accountId },
      { $set: { name: req.body.name } }
    );
    res.json(updateAccount);
  } catch (err) {
    res.status(404).send("Account not found");
  }
});

module.exports = router;
