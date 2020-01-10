const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// Middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Front Page
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes
const accountRoute = require("./routes/accounts");
app.use("/accounts", accountRoute);

// Database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

const port = process.env.PORT || 8080;
app.listen(port);
