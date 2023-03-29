const { Router } = require('express');
const {
    getAllCharacters, 
    createCharacter, 
    updateCharacter, 
    getById, 
    deleteCharacter
} = require('../controllers/characters');

const { 
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations
} = require('../middlewares/Characters');


const router = Router();

router.get('/', getAllRequestValidation, getAllCharacters);
router.post('/', postRequestValidations, createCharacter);
router.put('/:id', putRequestValidations, updateCharacter);
router.get('/:id', getRequestValidation, getById);
router.delete('/:id', deleteRequestValidations, deleteCharacter);

module.exports = router;