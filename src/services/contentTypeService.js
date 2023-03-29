const ContentTypeRepository = require('../repositories/contentTypeRepository');
const repository = new ContentTypeRepository();


//*FILTRAR POR ID
const findById = async (id) => {
    return await repository.findById(id);
};


//*FILTRAR POR DESCRIPTION
const findByDescription = async (description) => {
    return await repository.findByDescription(description);
};

module.exports = {
    findByDescription,
    findById,
};