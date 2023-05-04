const { Router } = require('express');
const multer = require('multer');
const upload = multer();
const {
    getAllCharacters, 
    createCharacter, 
    updateCharacter, 
    getById, 
    deleteCharacter,
    uploadCharacterImage
} = require('../controllers/characters.controller');

const { 
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations,
    postImageRequestValidations
} = require('../middlewares/characters');


const router = Router();

router.get('/', getAllRequestValidation, getAllCharacters);
router.post('/', postRequestValidations, createCharacter);
router.put('/:id', putRequestValidations, updateCharacter);
router.get('/:id', getRequestValidation, getById);
router.delete('/:id', deleteRequestValidations, deleteCharacter);
router.post('/image', postImageRequestValidations, uploadCharacterImage);
module.exports = router;