const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Middleware
const app = express();
app.use(express.static("dist"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Front Page
app.get("/api", (req, res) => {
  res.send({ message: "Server is running" });
});

// Routes
const accountRoute = require("./routes/accounts");
app.use("/api/accounts", accountRoute);

// Database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));
