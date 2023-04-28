const { Router } = require('express');
const {
    getAllMovies, 
    createMovie, 
    updateMovie, 
    getById, 
    deleteMovie,
    uploadMovieImage
} = require('../controllers/movies');
const { 
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations,
    postImageRequestValidations
} = require('../middlewares/movies');


const router = Router();

router.get('/', getAllRequestValidation, getAllMovies);
router.post('/', postRequestValidations, createMovie);
router.put('/:id', putRequestValidations, updateMovie);
router.get('/:id', getRequestValidation, getById);
router.delete('/:id', deleteRequestValidations, deleteMovie);
router.post('/image', postImageRequestValidations, uploadMovieImage);

module.exports = router;