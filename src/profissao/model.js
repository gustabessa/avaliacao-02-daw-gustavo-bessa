const db = require('../configs/sequelize');
const sequelize = db.sequelize;
const { Model, DataTypes } = db.Sequelize;
const Profissional = require('../profissional/model');

class Profissao extends Model {}

Profissao.init({
  nome: {
    allowNull: false,
    type: DataTypes.STRING(50)
  }
}, {sequelize, modelName: "profissoes"})

Profissional.Profissao = Profissao.hasMany(Profissional, {
  foreignKey: {
    name: 'fk_profissional_profissao',
    allowNull: false
  }
})

Profissao.Profissional = Profissional.belongsTo(Profissao, {
  foreignKey: {
    name: 'fk_profissional_profissao',
    allowNull: false
  }
})

module.exports = Profissao
/**
Nome (obrigatório), no máximo 40 caracteres;
CPF (obrigatório), somente números;
Data de nascimento (obrigatório);
Telefone (obrigatório);
Profissão (obrigatório);
Escolaridade (obrigatório);
Habilidades (obrigatório). */