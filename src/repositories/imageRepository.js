const AWS = require('aws-sdk');
const config = require('../config')
const AppError = require('../errors/appError')

class ImageRepository {

    //TODO:configuracion credenciales para el servicio AWS S3
    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: config.aws.accessKeyId,
            secretAccessKey: config.aws.privateAccessKey
        });
    };

    //(configuracion) metodo para subir la imagen a aws s3
    uploadImage(name, image, type) {

        const Key = `${name}.${type.split('/')[1]}`; //agregando la extencion a las imagenes (jpj,pgn, etc..)
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: config.aws.s3BucketName,
                Key,
                Body: image,
                ContentType: type,
                ACL: 'public-read'
            };

            this.s3.upload(params, (err, data) => {
                if (err) {
                    reject(new AppError(err.message, 502,));
                }
                // armado la URL de la imagen subida
                resolve(`https://${config.aws.s3BucketName}.s3.amazonaws.com/${Key}`);
            });
        })
    };
    

    //(configuracion) metodo para eliminar la img existente en aws y sobreponer una nueva
    deleteImage(name, type) {
        const Key = `${name}.${type.split('/')[1]}`; //agregando la extencion a las imagenes (jpj,pgn, etc..)
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: config.aws.s3BucketName,
                Key,
            };

            this.s3.deleteObject(params, (err, data) => {
                if (err) {
                    reject(new AppError(err.message, 502,));
                }
                // armado la URL de la imagen subida
                resolve(true);
            });
        });
    };

}

module.exports = ImageRepository;