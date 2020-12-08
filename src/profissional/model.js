const db = require('../configs/sequelize');
const sequelize = db.sequelize;
const { Model, DataTypes } = db.Sequelize;

class Profissional extends Model {}

Profissional.init({
  nome: {
    allowNull: false,
    type: DataTypes.STRING(40)
  },
  cpf: {
    allowNull: false,
    unique: 'cpfUniqueIndex',
    type: DataTypes.STRING(11)
  },
  dataNascimento: {
    allowNull: false,
    type: DataTypes.DATE
  },
  telefone: {
    allowNull: false,
    type: DataTypes.STRING(20)
  },
  habilidades: {
    allowNull: false,
    type: DataTypes.STRING(250)
  }
}, {sequelize, modelName: "profissionais"})

module.exports = Profissional
