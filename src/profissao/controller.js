const Profissional = require('./model');
const db = require('../configs/sequelize');

exports.create = (req, res) => {
  Profissional.create({
    nome: req.body.nome
  }).then(data => {
    res.send(data)
  }).catch('Erro ao criar');
}

exports.findAll = (req, res) => {
  Profissional.findAll().then(data => {
    res.send(data)
  }).catch('Erro ao buscar todos')
}