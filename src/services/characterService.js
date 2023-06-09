const CharacterRepository = require('../repositories/characterRepository');
const repository = new CharacterRepository();

const ImageRepository = require('../repositories/imageRepository');
const imageRepository = new ImageRepository();


//*FILTRAR POR ID
const findById = async (id) => {
    return await repository.findByIdWhitMovies(id);
};


//*FILTRAR POR NAME
const findByName = async (name) => {
    return await repository.findByName(name);
};


//*LISTANDO TODA LA DB
const findAll = async (filter, options) => {
    // return await repository.findAllWithPagination(filter, options);
    return await repository.findAll(filter, options);
};


//*GUARDANDO UN CHARACTER
const save = async (character) => {
    return await repository.save(character);
};


//*ACTUALIZANDO UN CHARACTER
const update = async (id, character) => {
    return await repository.update(id, character);
};


//*ELIMINAR UN REGISTRO
const remove = async (id) => {
    const character = await repository.findById(id)
    imageRepository.deleteImage(character.image);
    return await repository.remove(id);
};


module.exports = {
    findByName,
    save,
    update,
    findById,
    remove,
    findAll
};