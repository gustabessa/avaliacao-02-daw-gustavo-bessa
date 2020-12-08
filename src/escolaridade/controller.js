const Escolaridade = require('./model');
const db = require('../configs/sequelize');

exports.create = (req, res) => {
  Escolaridade.create({
    nome: req.body.nome
  }).then(data => {
    res.send(data)
  }).catch('Erro ao criar');
}

exports.findAll = (req, res) => {
  Escolaridade.findAll().then(data => {
    res.send(data)
  }).catch('Erro ao buscar todos')
}