const MovieRepository = require('../repositories/movieRepository');
const repository = new MovieRepository();

const GenderTypeRepository = require('../repositories/genderTypeRepository');
const genderTypeRepository = new GenderTypeRepository();

const ContentTypeRepository = require('../repositories/contentTypeRepository');
const contentTypeRepository = new ContentTypeRepository();


//*FILTRAR POR ID
const findById = async (id) => {
    return await repository.findByIdWhitCharacters(id);
};

//*FILTRAR POR TITLE
const findByTitle = async (title) => {
    return await repository.findByTitle(title);
};

//*metodo para filtrar la db (consultas por filtros paginacion)
const findAll = async (filter, options) => {
    return await repository.findAll(filter, options);
};

//*GUARDANDO UN CHARACTER
const save = async (movie) => {
    //PERSISTIENDO EL genderType y contentType en la tabla movie (relacion)
    const genderType = await genderTypeRepository.findByDescription(movie.genderType);
    const contentType = await contentTypeRepository.findByDescription(movie.contentType);
    movie.genderTypeId = genderType.id;
    movie.contentTypeId = contentType.id;
    return await repository.save(movie);
};

// //*ACTUALIZANDO MOVIE
const update = async (id, movie) => {
    //PERSISTIENDO EL genderType en la tabla movie
    if (movie.genderType || movie.contentType) {
        const genderType = await genderTypeRepository.findByDescription(movie.genderType);
        const contentType = await contentTypeRepository.findByDescription(movie.contentType)
        movie.genderTypeId = genderType.id;
        movie.contentTypeId = contentType.id;
    };

    return await repository.update(id, movie);
};

// //*ELIMINAR UN REGISTRO
const remove = async (id) => {
    return await repository.remove(id);
};

//*consulta a dos tablas de la db
const asociate = async (movie, character) => {
    await movie.addCharacter(character);
};

module.exports = {
    findById,
    save,
    update,
    findByTitle,
    remove,
    findAll,
    asociate
}