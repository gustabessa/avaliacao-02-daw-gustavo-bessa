const db = require('../configs/sequelize');
const Profissional = require('./model');
const Profissao = require('../profissao/model');
const Escolaridade = require('../escolaridade/model');

exports.create = (req, res) => {
  Profissional.create({
  nome: req.body.nome,
  cpf: req.body.cpf,
  dataNascimento: req.body.nascimento,
  telefone: req.body.telefone,
  fk_profissional_escolaridade: req.body.escolaridade,
  habilidades: req.body.habilidades,
  fk_profissional_profissao: req.body.profissao,
}).then(data => {
    res.send(data)
  }).catch('Erro ao criar');
}

exports.findAll = (req, res) => {
  Profissional.findAll({include: [Profissao, Escolaridade]}).then(data => {
    res.send(data)
  }).catch('Erro ao buscar todos')
}