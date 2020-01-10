const Joi = require("joi");
const bcrypt = require("bcryptjs");

function validateRegister(request) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
      .max(255),
    email: Joi.string()
      .min(3)
      .required()
      .max(255)
      .email(),
    password: Joi.string()
      .min(3)
      .required()
      .max(255),
    description: Joi.string()
      .min(3)
      .required()
      .max(255),
    role: Joi.string()
      .min(3)
      .required()
      .max(255)
  };

  return Joi.validate(request, schema);
}

function validateLogin(request) {
  const schema = {
    email: Joi.string()
      .min(3)
      .required()
      .max(255)
      .email(),
    password: Joi.string()
      .min(3)
      .required()
      .max(255)
  };

  return Joi.validate(request, schema);
}

function emailExists(email, Account) {
  return Account.findOne({ email: email });
}

function validatePassword(requestPassword, userPassword) {
  return bcrypt.compare(requestPassword, userPassword);
}

module.exports.validateRegister = validateRegister;
module.exports.validateLogin = validateLogin;
module.exports.emailExists = emailExists;
module.exports.validatePassword = validatePassword;
