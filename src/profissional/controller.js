const db = require('../configs/sequelize');
const { Op } = require("sequelize");
const Profissional = require('./model');
const Profissao = require('../profissao/model');
const Escolaridade = require('../escolaridade/model');

exports.create = (req, res) => {

  validateProfissional(req, res);

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
  }).catch(err => {
    if (err.errors) {
      res.send(err.errors[0].message)
    } else {
      res.send(err.message)
    }
  });
}

exports.findAll = (req, res) => {
  let where = {}
  if (req.query) {

    if (req.query.cpf) {
      where = {
        ...where,
        cpf: req.query.cpf
      }
    }
  
    if (req.query.nome) {
      where = {
        ...where,
        nome: {
          [Op.iLike]: '%' + req.query.nome + '%'
        }
      }
    }

    if (req.query.dataNascInicial && req.query.dataNascFinal) {
      where = {
        ...where,
        dataNascimento: {
          [Op.between]: [req.query.dataNascInicial, req.query.dataNascFinal]
        }
      }
    } else if (req.query.dataNascInicial) {
      where = {
        ...where,
        dataNascimento: {
          [Op.gte]: req.query.dataNascInicial
        }
      }
    } else if (req.query.dataNascFinal) {
      where = {
        ...where,
        dataNascimento: {
          [Op.lte]: req.query.dataNascFinal
        }
      }
    }

  }

  Profissional.findAll({include: [Profissao, Escolaridade], 
    where: where,
    order: ['nome']
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

exports.destroy = (req, res) => {
  Profissional.destroy({
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

exports.update = (req, res) => {

  validateProfissional(req, res);

  Profissional.update({
    nome: req.body.nome,
    cpf: req.body.cpf,
    dataNascimento: req.body.nascimento,
    telefone: req.body.telefone,
    fk_profissional_escolaridade: req.body.escolaridade,
    habilidades: req.body.habilidades,
    fk_profissional_profissao: req.body.profissao,
  }, {
    where: {
      id: req.body.id
    }
  }).then(() => {
    res.send({'message': 'ok'})
  }).catch(err => {
    if (err.errors) {
      res.send(err.errors[0].message)
    } else {
      res.send(err.message)
    }
  });
}

exports.findOne = (req, res) => {
  const id = req.params.id;
  Profissional.findOne({include: [Profissao, Escolaridade], where: {id: id}}).then(data => {
    res.send(data)
  }).catch(err => {
    if (err.errors) {
      res.send(err.errors[0].message)
    } else {
      res.send(err.message)
    }
  });
}

exports.findOneByCpf = (req, res) => {
  const cpf = req.params.cpf;
  Profissional.findOne({include: [Profissao, Escolaridade], where: {cpf: {[Op.like]: cpf}}}).then(data => {
    res.send(data)
  }).catch(err => {
    if (err.errors) {
      res.send(err.errors[0].message)
    } else {
      res.send(err.message)
    }
  });
}

function validateProfissional(req, res) {
  try {
    if (!req.body.nome) {
      throw 'Por favor, digite o seu nome.'
    }
    if (!req.body.cpf) {
      throw 'Por favor, digite o seu CPF.'
    }
    if (!req.body.nascimento) {
      throw 'Por favor, digite a sua data de nascimento.'
    }
    if (!req.body.telefone) {
      throw 'Por favor, digite o seu telefone.'
    }
    if (!req.body.escolaridade) {
      throw 'Por favor, escolha a sua escolaridade.'
    }
    if (!req.body.profissao) {
      throw 'Por favor, escolha a sua profissao.'
    }
    if (!req.body.habilidades) {
      throw 'Por favor, digite as suas habilidades.'
    }
  } catch (error) {
    res.send(error)
  }
}