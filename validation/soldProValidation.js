const Joi = require("joi");

const soldProValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().min(2),
    orgPrice: Joi.number().required(),
    price: Joi.number().required(),
    totalPrice: Joi.number().required(),
    quantity: Joi.number().required(),
    size: Joi.string(),
    category: Joi.string(),
    subcategory: Joi.string(),
    color: Joi.string(),
    brand: Joi.string(),
    barcode: Joi.string(),
    addedTime: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message);
  next();
};

module.exports = { soldProValidation };
