const { check } = require('express-validator');
const AppError = require('../../errors/appError');
const characterService = require('../../services/characterService');
const { ROLES, ADMIN_ROLE, USER_ROLE } = require('../../constants');
const logger = require('../../loaders/logger');
const {validationResult, imageRequired:_imageRequired} = require('../commons');
const { validJWT, hasRole } = require('../auth');
const multer = require('multer');
const upload = multer();


const _nameRequired = check('name', 'Name required').not().isEmpty();


//*VALIDAR SI PASAR EL ROLE EN EL BODY (REQUEST)
const _roleValid = check('role').optional().custom(
    async (role = '') => {
        if(!ROLES.includes(role)) {
            throw new AppError('Ivalid Role', 400);
        }
    }
);


//*VALIDACION DE ID
const _idRequied = check('id').not().isEmpty();
const _idIsNumeric = check('id').isNumeric();
const _idExist = check('id').custom(
    async (id = '') => {
        const characterFound = await characterService.findById(id);
        if(!characterFound) {
            throw new AppError('The id does not exist in DB', 400);
        }
    }
);

//*campos del request
const _ageIsNumeric = check('age').isNumeric().optional();
const _weightIsNumeric = check('weight').isNumeric().optional();
const _historyRequired = check('history').not().isEmpty();

//*CAMPO NAME NO SEA REPETIDO
const _nameNotExist = check('name').custom(
    async (name = '') => {
        const characterFound = await characterService.findByName(name);
        if(characterFound) {
            throw new AppError('Name already exist in DB', 400);
        }
    }
);


//*usando multer para la image
const uploadImage = upload.single('image')


//TODO: validacion para metodo POST 
const postRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _nameRequired,
    _nameNotExist,
    _ageIsNumeric,
    _historyRequired,
    _weightIsNumeric,
    validationResult
]

//TODO: validacion para metodo PUT
const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied,
    _nameNotExist,
    _idIsNumeric,
    _idExist,
    _ageIsNumeric,
    _weightIsNumeric,
    _roleValid,
    validationResult
]

//TODO: validacion para metodo DELETE
const deleteRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied,
    _idIsNumeric,
    _idExist,
    validationResult
]

//TODO: validacion para metodo GET_ALL
const getAllRequestValidation = [
    validJWT
]

//TODO: validacion para metodo GET_ONE
const getRequestValidation = [
    validJWT,
    _idRequied,
    _idIsNumeric,
    _idExist,
    validationResult
]

//TODO: validacion para imagenes
const postImageRequestValidations = [
    validJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    uploadImage,
    _idRequied,
    _idIsNumeric,
    _idExist,
    _imageRequired,
    validationResult
]

module.exports = {
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations,
    postImageRequestValidations
}
