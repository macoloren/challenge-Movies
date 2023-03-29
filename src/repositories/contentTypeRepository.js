const ContentType = require('../models/contentTypes');

//!METODOS PARA HACER LAS CONSULTAS A LA DATA BASE (esta relacionada con las movies)
class ContentTypeRepository {

    constructor() {

    };
   

    //*FILTRAR POR ID
    async findById(id) {
        return await ContentType.findByPk(id);
    };


    //*BUSQUEDA POR CAMPO DESCRIPTION
    async findByDescription(description) {
        console.log(description);
        return await ContentType.findOne({ where: { description }});
    };
};

module.exports = ContentTypeRepository;