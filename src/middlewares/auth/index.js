const { check } = require('express-validator');
const { validationResult } = require('../commons');
const { validToken, validRole } = require('../../services/authService');


//TODO: validando los campos de Login POST
const _nameRequired = check('name', 'Name required').not().isEmpty();
const _emailRequired = check('email', 'Email required').not().isEmpty();
const _emailValid = check('email', 'Email is invalid').isEmail();
const _passwordRequired = check('password', 'Password required').not().isEmpty();

//TODO: Validacion para el Login
const postLoginRequestValidations = [
    _emailRequired,
    _emailValid,
    _passwordRequired,
    validationResult
]

//TODO: Validacion para el Register
const postRegisterRequestValidations = [
    _nameRequired,
    _emailRequired,
    _emailValid,
    _passwordRequired,
    validationResult
]

const validJWT = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const user = await validToken(token);
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}

const hasRole = (...roles) => {
    return (req, res, next) => {
        try {
            validRole(req.user, ...roles);
            next();
        } catch (err) {
            next(err);
        }
    }
}


module.exports = {
    postLoginRequestValidations,
    postRegisterRequestValidations,
    validJWT,
    hasRole
}