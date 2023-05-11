const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');


const Movie = sequelize.define('Movie', {
  // Model attributes are defined here
  image: {
    type: DataTypes.STRING(600),
    allowNull: true
  },
  title: {
    type: DataTypes.STRING(250),
    allowNull: false,
    unique: true
  },
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  calification: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  // Other model options go here
});

module.exports = Movie


//*RELACION CHARACTERS Y MOVIES MUCHOS A MUCHOS
Movie.belongsToMany(require('./characters'), {
  through: "characterMovies",
  as:"characters",
  foreignKey: "movieId"
});

Movie.belongsTo(require('./contentTypes'), {
  foreignKey: "contentTypeId",
  targetKey: "id",
  as: 'type'
});

Movie.belongsTo(require('./genderTypes'), {
  foreignKey: "genderTypeId",
  targetKey: "id",
  as: 'gender'
});

