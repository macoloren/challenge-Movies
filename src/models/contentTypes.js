const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');


//*MODELO PARA SABER SI ES PELICULA O SERIE
const ContentType = sequelize.define('ContentType', {
  // Model attributes are defined here
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  timestamps: false
});

module.exports = ContentType

//*RELACION DE UNO A UNO

  ContentType.hasMany(require('./movies'), {
    as: 'movies',
    foreignKey: 'contentTypeId'
  });

