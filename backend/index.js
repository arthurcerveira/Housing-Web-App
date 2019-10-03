const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv/config");

// Middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname + "/../frontend")));

// Front Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../frontend/index.html"));
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

const port = process.env.PORT || 3000;
app.listen(port);
