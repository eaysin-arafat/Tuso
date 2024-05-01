import Joi from "joi";

export const userProfileValidator = Joi.object({
  name: Joi.string().messages({
    "string.empty": "Required",
    "string.base": "Name should be a type of",
    "string.required": "Required",
  }),
  surname: Joi.string().messages({
    "string.empty": "Required",
    "string.min": "Description should have a minimum length of 6",
    "string.max": "Description should have a maximum length of 30",
  }),
  cellphone: Joi.string().messages({
    "string.empty": "Required",
    "string.min": "Description should have a minimum length of 6",
    "string.max": "Description should have a maximum length of 30",
  }),
  email: Joi.string().optional().allow("").messages({
    "string.min": "Description should have a minimum length of 6",
    "string.max": "Description should have a maximum length of 30",
  }),
  countryCode: Joi.string().optional().allow("").messages({
    "string.empty": "Required",
    "string.base": "Country Code should be a type of",
    "string.required": "Required",
  }),
  image: Joi.string().allow("").optional(),
});
