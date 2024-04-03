import Joi from 'joi';

// schemas:
export const createUserSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
}).options({ abortEarly: false });


export const updateUserSchema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string()
    // abort early false shows all errors and don't stops at the first error:
}).options({ abortEarly: false });

// middleware to validate (check) request body against schema
export const validateRequest = (schema) => {
    return async (req, res, next) => {
        await schema.validateAsync(req.body);
        next();
    };
};
