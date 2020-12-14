module.exports =  (app) => {
  const controller = require('./controller')
  
  // Criar novo profissao
  app.post('/profissao', controller.create);
  
  // Criar novo profissao
  app.delete('/profissao', controller.destroy);

  // Busca todos os profissoes
  app.get('/profissao', controller.findAll);
}