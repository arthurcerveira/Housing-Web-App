const express = require("express");
const Account = require("../models/Account");
const bcrypt = require("bcryptjs");
const validation = require("../validation");

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
    res.status(204).send("Account not found");
  }
});

// Create an account
router.post("/register", async (req, res) => {
  // Validate account info
  const { error } = validation.validateRegister(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Check if account exists
  const emailExists = await validation.emailExists(req.body.email, Account);
  if (emailExists) {
    res.status(400).send("Email already exists");
    return;
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Creates the account
  const account = new Account({
    email: req.body.email,
    password: hashPassword,
    name: req.body.name,
    description: req.body.description,
    role: req.body.role
  });

  try {
    const savedAccount = await account.save();
    res.json({ account: account.id });
  } catch (err) {
    res.status(400).json({ message: error });
  }
});

// Delete an account
router.delete("/:accountId", async (req, res) => {
  try {
    const removedAccount = await Account.remove({ _id: req.params.accountId });
    res.json(removedAccount);
  } catch (err) {
    res.status(204).send("Account not found");
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
    res.status(204).send("Account not found");
  }
});

module.exports = router;
