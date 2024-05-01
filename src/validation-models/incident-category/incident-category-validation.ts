import Joi from "joi";

export const incidentValidation = Joi.object({
  incidentCategorys: Joi.string().required().messages({
    "string.empty": "Required",
    "string.min": "First Lebel Category should have a minimum length of 3",
    "string.max": "First Lebel Category should have a maximum length of 30",
    "string.base": "First Lebel Category should be a type of",
    "string.required": "Required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Required",
    "string.min": "Description should have a minimum length of 6",
    "string.max": "Description should have a maximum length of 30",
  }),
});
