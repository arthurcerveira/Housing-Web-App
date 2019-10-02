const Joi = require("joi");

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

module.exports.validateRegister = validateRegister;
module.exports.validateLogin = validateLogin;
