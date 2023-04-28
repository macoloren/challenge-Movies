const { Op } = require('sequelize');
const Character = require('../models/characters');


//!METODOS PARA HACER LAS CONSULTAS A LA DATA BASE
class CharacterRepository {

    constructor() {

    };


    //TODO: FALTA IMPLEMENTAR FILTRO MOVIE TITLE
    //*LISTAR TODA LA DB
    async findAll({ name, age, weight, movieTitle }, { limit, offset, order }) {
        //parametros a considerar para filtrar
        let where = {};
        if (name) {
            where.name = {
                [Op.like]: `%${name}%`
            }
        };

        if (age) {
            where.age = {
                [Op.eq]: age
            }
        };

        if (weight) {
            where.weight = {
                [Op.eq]: weight
            }
        };

        return await Character.findAll({
            where,
            attributes: ['name', 'image']
        });
    };


    //*FILTRAR POR ID
    async findById(id) {
        return await Character.findByPk(id);
    };


    //*BUSQUEDA POR CAMPO NAME
    async findByName(name) {
        return await Character.findOne({ where: { name } });
    };


    //*GUARDANDO UN CHARACTER
    async save(character) {
        return await Character.create(character);
    };


    //*ACTUALIZANDO UN CHARACTER
    async update(id, character) {
        return await Character.update(character, {
            where: {
                id
            }
        });
    };


    //* ELIMINAR UN REGISTRO
    async remove(id) {
        return await Character.destroy({
            where: {
                id
            }
        });
    };
};

module.exports = CharacterRepository;