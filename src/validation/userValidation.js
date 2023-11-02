import Joi from 'joi';

const createUserValidation = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().max(100).email().required(),
  password: Joi.string().max(100).required(),
});

const updateUserValidation = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().max(100).email().optional(),
  password: Joi.string().max(100).optional(),
});

const getUserIdValidation = Joi.number().max(100).required();

export { createUserValidation, updateUserValidation, getUserIdValidation };
