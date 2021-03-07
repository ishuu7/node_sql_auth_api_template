const verifySchema = require('../middlewares/verifySchema');
const Joi = require('joi');
const registerSchema = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required()
    })

    verifySchema(req, next, schema);
}

module.exports = registerSchema;