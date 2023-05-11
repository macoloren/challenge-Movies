const express = require('express');
const movieService = require('../services/movieService');
const Success = require('../handlers/successHandler');
const logger = require('../loaders/logger');
const imageService = require('../services/imageService')


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getAllMovies = async (req, res, next) => {
    try {

        logger.info('Query: ' + JSON.stringify(req.query));

        const { filter = '', options = '' } = req.query

        const movies = await movieService.findAll(filter, options);
        res.json(new Success(movies));
        
    } catch (err) {
        console.log(err);
        next(err);
    }
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const createMovie = async (req, res, next) => {
    try {
        let movie = req.body;
        movie = await movieService.save(movie);

        res.status(201).json(new Success(movie));
    } catch (err) {
        next(err);
    }
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const updateMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
        let movie = req.body;

        const movieUpdated = await movieService.update(id, movie);

        res.json(new Success(movieUpdated));
    } catch (err) {
        next(err);
    }
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getById = async (req, res) => {
    try {
        const movie = await movieService.findById(req.params.id);
        res.json(new Success(movie));
    } catch (err) {
        next(err);
    }
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const deleteMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = await movieService.remove(id);
        res.json(new Success(movie));
    } catch (err) {
        next(err);
    }
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * metodo para las imagenes que se suben AWS de movies
 */
const uploadMovieImage = async (req, res, next) => {
    try {
        const movieId = req.body.id;
        const image = req.file;
        console.log('********si llego hasta qui *-******');
        res.json(new Success(await imageService.uploadMovieImage(movieId, image)));
    } catch (err) {
        next(err);
    }
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const asociateCharacter = async (req, res, next) => {
    try {
        const movie = req.movie;
        const character = req.character;
        
        await movieService.asociate(movie, character)
        res.json(new Success());
    } catch (err) {
        next(err);
    }
};


module.exports = {
    getAllMovies,
    createMovie,
    updateMovie,
    getById,
    deleteMovie,
    uploadMovieImage,
    asociateCharacter
}