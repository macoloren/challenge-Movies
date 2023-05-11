const { Op } = require('sequelize');
const Movie = require('../models/movies');
const Character = require('../models/characters');


//!METODOS PARA HACER LAS CONSULTAS A LA DATA BASE
class MovieRepository {

    constructor() {

    }

    //TODO: IMPLEMENTAR FILTRO

    async findAll({ title, calification, creationDate }, {limit, offset, order}) {

        //parametros a considerar para filtrar
        let where = {};
        if (title) {
            where.title = {
                [Op.like]: `%${title}%`
            }
        };

        if (calification) {
            where.calification = {
                [Op.eq]: calification
            }
        };

        if (creationDate) {
            where.creationDate = {
                [Op.eq]: creationDate
            }
        };

        let config = {
            where,
            attributes: ['title', 'image', 'creationDate'], //retornando solo estos atributos
            
        }

        if (order) {
            config.order = [order.split(';')]
        }

        return await Movie.findAll(config);
    }


    //*FILTRAR POR ID
    async findById(id) {
        return await Movie.findByPk(id);
    }


    //*metodo asociacion de chracters a movies
    async findByIdWhitCharacters(id) {
        return await Movie.findByPk(id, {
            include: [
                'characters',
                'gender',
                'type'
            ],
            attributes: ['id','title','image', 'creationDate', 'calification']
        });
    };


    //*BUSQUEDA POR CAMPO TITLE
    async findByTitle(title) {
        return await Movie.findOne({ where: { title } });
    };


    //*GUARDANDO MOVIE
    async save(movie) {
        return await Movie.create(movie);
    };


    //*ACTUALIZANDO MOVIE
    async update(id, movie) {
        return await Movie.update(movie, {
            where: {
                id
            }
        });
    };


    // //* ELIMINAR UN REGISTRO
    async remove(id) {
        return await Movie.destroy({
            where: {
                id
            }
        });
    }; 
};
module.exports = MovieRepository;