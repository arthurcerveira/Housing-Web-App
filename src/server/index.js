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

const mongoConncection =
  process.env.NODE_ENV === "production"
    ? "mongodb://mongo:27017/housing"
    : "mongodb://localhost:27017/housing";

// Database
mongoose
  .connect(mongoConncection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));
