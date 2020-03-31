const express = require("express");
const Account = require("../models/Account");
const bcrypt = require("bcryptjs");
const validation = require("../validation");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

// Create an account
authRouter.post("/register", async (req, res) => {
  // Validate account info
  const { error } = validation.validateRegister(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  // Check if account exists
  const emailExists = await validation.emailExists(req.body.email, Account);
  if (emailExists) {
    res.status(400).json({ error: "Email already exists" });
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
    res.json({ account: savedAccount._id });
  } catch (err) {
    res.status(400).json({ message: error });
  }
});

// Login in the account
authRouter.post("/login", async (req, res) => {
  // Validate login info
  const { error } = validation.validateLogin(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Check if account exists
  const emailExists = await validation.emailExists(req.body.email, Account);
  if (!emailExists) {
    res.status(400).send("Email not found");
    return;
  }

  // Find the account
  const account = await Account.findOne({ email: req.body.email });

  // Check if password is correct
  const validPass = await validation.validatePassword(
    req.body.password,
    account.password
  );
  if (!validPass) {
    res.status(400).send("Invalid password");
    return;
  }

  // Create a token
  const token = jwt.sign({ _id: account._id }, process.env.TOKEN_SECRET);
  res.header("Authorization", token).send(token);
});

module.exports = authRouter;
