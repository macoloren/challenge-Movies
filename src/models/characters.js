const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');

const Character = sequelize.define('Character', {
  // Model attributes are defined here
  image: {
    type: DataTypes.STRING(600),
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  history: {
    type: DataTypes.STRING(1500),
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  // Other model options go here
});

module.exports = Character

//*RELACION CHARACTERS Y MOVIES MUCHOS A MUCHOS
Character.belongsToMany(require('./movies'), {
  through: "characterMovies",
  as:"movies",
  foreignKey: "characterId"
});
