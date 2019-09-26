// const Joi = require("joi");
const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

const accounts = [];

class Account {
  constructor(email, password, name, description, role) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.description = description;
    this.role = role;
  }
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../frontend/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port " + port.toString() + "...");
});

console.log(__dirname);
