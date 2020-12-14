const db = require('../configs/sequelize');
const sequelize = db.sequelize;
const { Model, DataTypes } = db.Sequelize;
const Profissional = require('../profissional/model');

class Escolaridade extends Model {}

Escolaridade.init({
  nome: {
    allowNull: false,
    type: DataTypes.STRING(50)
  }
}, {sequelize, modelName: "escolaridade"})

Profissional.Escolaridade = Escolaridade.hasMany(Profissional, {
  foreignKey: {
    name: 'fk_profissional_escolaridade',
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

Profissional.Escolaridade = Profissional.belongsTo(Escolaridade, {
  foreignKey: {
    name: 'fk_profissional_escolaridade',
    allowNull: false
  },
  onDelete: 'RESTRICT'
})

module.exports = Escolaridade