const Escolaridade = require('./model');
const db = require('../configs/sequelize');

exports.create = (req, res) => {
  Escolaridade.create({
    nome: req.body.nome
  }).then(data => {
    res.send(data)
  }).catch(err => {
    if (err.errors) {
      res.send(err.errors[0].message)
    } else {
      res.send(err.message)
    }
  });
}

exports.findAll = (req, res) => {
  Escolaridade.findAll().then(data => {
    res.send(data)
  }).catch(err => {
    if (err.errors) {
      res.send(err.errors[0].message)
    } else {
      res.send(err.message)
    }
  });
}

exports.destroy = (req, res) => {
  Escolaridade.destroy({
    where: {
      id: req.body.id
    }
  }).then(affectedRows => {
    res.send({'message': 'ok', 'affectedRows': affectedRows})
  }).catch(err => {
    if (err.errors) {
      res.send(err.errors[0].message)
    } else {
      res.send(err.message)
    }
  });
}