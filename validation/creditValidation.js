const Joi = require("joi");

const creditValidation = (req, res, next) => {
    const schema = Joi.object({
        firstname: Joi.string().required().min(3),
        lastname: Joi.string().required().min(4),
        address: Joi.string().required(),
        phone: Joi.string().required().min(8),
        passport: Joi.string().required().min(9),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.send(error.details[0].message);
    next();
};

module.exports = {creditValidation};