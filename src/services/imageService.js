const ImageRepository = require('../repositories/imageRepository');
const imageRepository = new ImageRepository();

const CharacterRepository = require('../repositories/characterRepository');
const characterRepository = new CharacterRepository();

const MovieRepository = require('../repositories/movieRepository');
const movieRepository = new MovieRepository();

require('multer')

//subir imagenes de characters con el name del character ya guardado
const uploadCharacterImage = async (idCharacter, file) => {

    const character = await characterRepository.findById(idCharacter);

    if (character.image){
        await imageRepository.deleteImage(character.name, file.mimetype)
    }
    const imageURL = await imageRepository.uploadImage(character.name, file.buffer, file.mimetype);
    character.image = imageURL
    return await characterRepository.update(idCharacter, {image: imageURL});
};


//subir imagenes de movies con el name de la movie ya guardada
const uploadMovieImage = async (idMovie, image) => {
    
    const movie = movieRepository.findById(idMovie);

    if (movie.image){
        await imageRepository.deleteImage(movie.title, file.mimetype)
    };

    const imageURL = await imageRepository.uploadImage(movie.title, image);
    movie.image = imageURL;
    return await movieRepository.update(idMovie, movie)
};


module.exports = {
    uploadCharacterImage,
    uploadMovieImage
};
