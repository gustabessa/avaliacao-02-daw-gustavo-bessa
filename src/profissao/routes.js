module.exports =  (app) => {
  const controller = require('./controller')
  
  // Criar novo profissao
  app.post('/profissao', controller.create);

  // Busca todos os profissoes
  app.get('/profissao', controller.findAll);
}