import Joi from "joi";

export const signUpSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    age: Joi.number().integer().min(0).allow(null), 
      phoneNumbers: Joi.array().items(Joi.number()),
    skills: Joi.array().items(Joi.string())
  }),
};
