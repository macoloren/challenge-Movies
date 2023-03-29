const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');

const GenderType = sequelize.define('GenderType', {
  // Model attributes are defined here
  description: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  timestamps: false
});

module.exports = GenderType

//*RELACION DE UNO A UNO
GenderType.hasMany(require('./movies'), {
  foreignKey: 'genderTypeId',
  sourceKey: 'id',
});
