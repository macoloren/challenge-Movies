const { validationResult, checkSchema } = require('express-validator');
const AppError = require('../errors/appError');

const validResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new AppError('Validation Errors', 400, errors.errors);
    }
    next();
}

//* validando que la imagen no sea vacio
const imageRequired = checkSchema({
    'image': {
        custom: {
            options: (value, { req }) => !!req.file,
            errorMessage: 'You should upload a file',
        },
    },
})


module.exports = {
    validationResult: validResult,
    imageRequired
}