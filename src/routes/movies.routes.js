const { Router } = require('express');
const {
    getAllMovies, 
    createMovie, 
    updateMovie, 
    getById, 
    deleteMovie,
    uploadMovieImage,
    asociateCharacter
} = require('../controllers/movies.controller');
const { 
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations,
    postImageRequestValidations,
    asociationRequestValidations
} = require('../middlewares/movies');


const router = Router();

router.get('/', getAllRequestValidation, getAllMovies);
router.post('/', postRequestValidations, createMovie);
router.put('/:id', putRequestValidations, updateMovie);
router.get('/:id', getRequestValidation, getById);
router.delete('/:id', deleteRequestValidations, deleteMovie);
router.post('/image', postImageRequestValidations, uploadMovieImage);
router.put('/:idMovie/characters/:idCharacter', asociationRequestValidations, asociateCharacter);

module.exports = router;