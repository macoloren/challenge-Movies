const GenderType = require('../models/genderTypes');

//!METODOS PARA HACER LAS CONSULTAS A LA DATA BASE (esta relacionada con las movies)
class GenderTypeRepository {

    constructor() {

    };
   

    //*FILTRAR POR ID
    async findById(id) {
        return await GenderType.findByPk(id);
    };


    //*BUSQUEDA POR CAMPO DESCRIPTION
    async findByDescription(description) {
        return await GenderType.findOne({ where: { description }});
    };
}

module.exports = GenderTypeRepository;