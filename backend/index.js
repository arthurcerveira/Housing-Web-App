// const Joi = require("joi");
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

const accounts = [];

class Account {
  constructor(id, email, password, name, description, role) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.description = description;
    this.role = role;
  }

  updateInfo(name, description, role) {
    this.name = name;
    this.description = description;
    this.role = role;
  }
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../frontend/index.html"));
});

app.get("/accounts", (req, res) => {
  res.send(accounts);
});

app.get("/accounts/:id", (req, res) => {
  const account = accounts.find(a => a.id === parseInt(req.params.id));
  if (!account) {
    res.status(404).send("The account was not found");
    return;
  }

  res.send(account);
});

app.post("/accounts", (req, res) => {
  const { error } = validateAccount(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const account = new Account(
    accounts.length + 1,
    req.body.email,
    req.body.password,
    req.body.name,
    req.body.description,
    req.body.role
  );

  accounts.push(account);
  res.send(account);
});

app.put("/accounts/:id", (req, res) => {
  const account = accounts.find(a => a.id === parseInt(req.params.id));
  if (!account) return res.status(404).send("The account was not found");

  const { error } = validateAccount(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  account.updateInfo(req.body.name, req.body.description, req.body.role);
  res.send(account);
});

app.delete("/api/accounts/:id", (req, res) => {
  const account = accounts.find(a => a.id === parseInt(req.params.id));
  if (!account) return res.status(404).send("The account was not found");

  const index = accounts.indexOf(account);
  accounts.splice(index, 1);

  res.send(account);
});

function validateAccount(request) {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    description: Joi.string().required(),
    role: Joi.string().required()
  };

  return Joi.validate(request, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port " + port.toString() + "...");
});

console.log(__dirname);
