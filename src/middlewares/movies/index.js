const { check } = require('express-validator');
const AppError = require('../../errors/appError');
const movieService = require('../../services/movieService');
const characterService = require('../../services/characterService');
const contentTypeService = require('../../services/contentTypeService');
const genderTypeService = require('../../services/genderTypeService');
const { ROLES, ADMIN_ROLE, USER_ROLE } = require('../../constants');
const logger = require('../../loaders/logger');
const { validationResult, imageRequired: _imageRequired } = require('../commons');
const { validJWT, hasRole } = require('../auth');
const multer = require('multer');
const upload = multer();


const _validationDate = check('creationDate').optional().isDate('MM-DD-YYYY');
const _creationDate = check('creationDate', 'Creation Date required').not().isEmpty();

const _calification = check('calification', 'calification required').not().isEmpty();
const _calificationIsNumeric = check('calification').isNumeric();
const _calificationOpcional = check('calification').optional();
const _calificationCero = check('calification').custom(
    async (calification = '') => {
        if (calification == 0) {
            throw new AppError('Calification no puede ser 0', 400);
        }
    }
);

const _calificationHigh = check('calification').custom(
    async (calification = '') => {
        if (calification > 10) {
            throw new AppError('very high rating', 400);
        }
    }
);

const _titleOpcional = check('title').optional();
const _titleRequired = check('title', 'Title required').not().isEmpty();
const _titleNotExist = check('title').custom(
    async (title = '') => {
        const titleFound = await movieService.findByTitle(title);
        if (titleFound) {
            throw new AppError('Title does exist in DB', 400);
        }
    }
);

const _contentTypeExistValidation = async (contentType = '') => {
    const contentTypeFound = await contentTypeService.findByDescription(contentType);
    if (!contentTypeFound) {
        throw new AppError('Content type does not exist in DB', 400);
    }
}

const _genderTypeExistValidation = async (genderType = '') => {
    const genderTypeFound = await genderTypeService.findByDescription(genderType);
    if (!genderTypeFound) {
        throw new AppError('Gender type does not exist in DB', 400);
    }
}

const _contentTypeExist = check('contentType').custom(_contentTypeExistValidation);
const _contentTypeExistAndOpcional = check('contentType').optional().custom(_contentTypeExistValidation)

const _genderTypeExist = check('genderType').custom(_genderTypeExistValidation);
const _genderTypeExistAndOpcional = check('genderType').optional().custom(_genderTypeExistValidation)

const _idExist = check('id').custom(
    async (id = '') => {
        const userFound = await movieService.findById(id);
        if (!userFound) {
            throw new AppError('The id does not exist in DB', 400);
        }
    }
);

const _idRequied = (name) => {
    return check(name).not().isEmpty();
};

const _idIsNumeric = (name) => {
    return check(name).isNumeric();
};

const _idCharacterExist = check('idCharacter').custom(
    async (idCharacter = '', { req }) => {
        const characterFound = await characterService.findById(idCharacter);
        if (!characterFound) {
            throw new AppError('The character id does not exist in DB', 400);
        }
        req.character = characterFound;
    }
);

const _idMovieExist = check('idMovie').custom(
    async (idMovie = '', { req }) => {
        const movieFound = await movieService.findById(idMovie);
        if (!movieFound) {
            throw new AppError('The movie id does not exist in DB', 400);
        }
        req.movie = movieFound
    }
);

//*usando multer para la image
const uploadImage = upload.single('image')


//TODO: validacion para metodo POST
const postRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _titleRequired,
    _titleNotExist,
    _creationDate,
    _validationDate,
    _calification,
    _calificationIsNumeric,
    _contentTypeExist,
    _genderTypeExist,
    _calificationCero,
    _calificationHigh,
    validationResult
]

// //TODO: validacion para metodo PUT
const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied('id'),
    _idIsNumeric('id'),
    _idExist,
    _validationDate,
    _calificationIsNumeric,
    _calificationOpcional,
    _titleNotExist,
    _titleOpcional,
    _contentTypeExistAndOpcional,
    _genderTypeExistAndOpcional,
    validationResult
]

// //TODO: validacion para metodo DELETE
const deleteRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied('id'),
    _idIsNumeric('id'),
    _idExist,
    validationResult
]

// //TODO: validacion para metodo GET_ALL
const getAllRequestValidation = [
    validJWT
]

//TODO: validacion para metodo GET_ONE
const getRequestValidation = [
    validJWT,
    _idRequied('id'),
    _idIsNumeric('id'),
    _idExist,
    validationResult
]

//TODO: validando el upload de la imagen 
const postImageRequestValidations = [
    validJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    uploadImage,
    _idRequied('id'),
    _idIsNumeric('id'),
    _idExist,
    _imageRequired,
    validationResult
]

//TODO: validacion 
const asociationRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied('idCharacter'),
    _idIsNumeric('idCharacter'),
    _idCharacterExist,
    _idRequied('idMovie'),
    _idIsNumeric('idMovie'),
    _idMovieExist,
    validationResult
]

module.exports = {
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations,
    postImageRequestValidations,
    asociationRequestValidations
}