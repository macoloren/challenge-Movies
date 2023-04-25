const dotenv = require('dotenv');

const envFound = dotenv.config();
if (!envFound) {
    throw new Error("Couldn't find .env file.");
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    port: process.env.PORT,
    api: {
        prefix: '/api/v1'
    },
    log: {
        level: process.env.LOG_LEVEL
    },
    swagger: {
        path: '/documentation'
    },

    //TODO CONEXION A LA BASE DE DATOS 
    database: {
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT,
        dialect : process.env.DATABASE_DIALECT
    },
    //TODO: VARIABLES DE ENTORNO PARA AUTENTICACION
    auth: {
        secret: process.env.AUTH_SECRET,
        ttl: process.env.AUTH_TTL
    },
    //TODO: VARIABLES DE ENTORNO PARA AWS SERVICIO S3, PERSISTENCIA DE IMAGENES
    aws: {
        accessKeyId : process.env.AWS_ACCESS_KEY_ID,
        privateAccessKey : process.env.AWS_PRIVATE_ACCESS_KEY,
        s3BucketName : process.env.AWS_S3_BUCKET_NAME
    }
};
