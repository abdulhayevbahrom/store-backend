const Joi = require("joi");

const creditValidation = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().required().min(3),
    lastname: Joi.string().required().min(4),
    address: Joi.string().required(),
    phone: Joi.number().required().min(8),
    passport: Joi.string().required().min(9),
    data: Joi.string().required(),
    stories: Joi.array().items(
      Joi.object({
        boughtTime: Joi.string().required(),
        totalPrice: Joi.number().required(),
        subTotal: Joi.number().required(),
        products: Joi.array()
          .items(
            Joi.object({
              title: Joi.string().required(),
              price: Joi.number().required(),
              barcode: Joi.string().required(),
              brand: Joi.string(),
              category: Joi.number().required(),
              color: Joi.string(),
              subcategory: Joi.string(),
              quantity: Joi.number().required(),
              size: Joi.number(),
              totalPrice: Joi.number().required(),
            })
          )
          .required(),
      })
    ),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message);
  next();
};

module.exports = { creditValidation };
