const Joi = require('joi');


//Login schema validation
const loginValidationSchema = Joi.object({
    _id: Joi.any(),
    email: Joi.string().email().trim().required().messages({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email address is required!',
        'any.required': 'Email address is required!',
    }),
    password: Joi.string().min(6).max(255).required().messages({
        'string.empty': 'Password is required!',
        'any.required': 'Password is required!',
    }),
});



const postValidationSchema = Joi.object({
  //allow the body to have value of _id
  _id: Joi.any(),
  writer: Joi.object().required(),
  title: Joi.string().required().max(100),
  body: Joi.string().required(),
  tags: Joi.array()
  .items(Joi.object({
    _id: Joi.any(),
    title: Joi.string().lowercase().regex(/^[a-zA-Z]*$/).required().min(2).max(100),
    date_created: Joi.date()
  })).required(),
  availability: Joi.date().required(),
  status: Joi.string().required().valid('Draft', 'Open', 'In Progress', 'Closed'),
  location: Joi.string().required(),
  people_needed: Joi.number().integer().min(1).required(),
  applicants: Joi.array().items(Joi.string()),
  people_accepted: Joi.array().items(Joi.string()),
  // applicants: Joi.array().items(Joi.object({
  //   userID: Joi.string()
  // })),
  // people_accepted: Joi.array().items(Joi.object({
  //   userID: Joi.string()
  // })),
  media : Joi.string(),
  date_created: Joi.date().required()
});




//Review schema validation
const reviewSchemaValidation = Joi.object({
     _id: Joi.any(),
    reviewer: Joi.string().required(),
    personBeingReviewed: Joi.string().required(),
    post_id: Joi.string().required(),
    description: Joi.string().max(255),
    stars: Joi.number().integer().min(1).max(5).required(),
});



//User schema validation
const userValidationSchema = Joi.object({
  _id: Joi.any(),
  firstName: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.empty': 'First name cannot be empty',
      'string.max': 'First name length must be at most 100 characters',
      'any.required': 'First name is required'
    }),
  lastName: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.empty': 'Last name cannot be empty',
      'string.max': 'Last name length must be at most 100 characters',
      'any.required': 'Last name is required'
    }),
  address: Joi.string()
    .max(250)
    .required()
    .messages({
      'string.empty': 'Address cannot be empty',
      'string.max': 'Address length must be at most 250 characters',
      'any.required': 'Address is required'
    }),
  description: Joi.string()
    .max(280)
    .messages({
      'string.empty': 'Description cannot be empty',
      'string.max': 'Description length must be at most 280 characters'
    }),
  phone: Joi.number()
    .required()
    .messages({
      'number.empty': 'Phone number cannot be empty',
      'any.required': 'Phone number is required'
    }),
  picture: Joi.string(),
  email: Joi.string()
    .email()
    .trim()
    .required()
    .messages({
      'string.empty': 'Email address cannot be empty',
      'string.email': 'Email address must be a valid email',
      'any.required': 'Email address is required'
    }),
  password: Joi.string()
    .max(255)
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password should be at least 6 characters long',
      'string.max': 'Password length must be at most 255 characters',
      'any.required': 'Password is required'
    }),
  been_helped: Joi.number(),
  helped_others: Joi.number(),
});

const descriptionValidation = Joi.object({
  description: Joi.string()
    .max(280)
    .messages({
      'string.empty': 'Description cannot be empty',
      'string.max': 'Description length must be at most 280 characters'
    }),
}).unknown(false);





module.exports = { loginValidationSchema, postValidationSchema, reviewSchemaValidation, userValidationSchema, descriptionValidation };