const verifySchema = require('../middlewares/verifySchema');
const Joi = require('joi');

const loginSchema = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    verifySchema(req, next, schema);
}

module.exports = loginSchema;