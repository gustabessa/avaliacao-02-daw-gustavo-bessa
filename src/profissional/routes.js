module.exports =  (app) => {
  const controller = require('./controller')
  
  // Criar novo profissional
  app.post('/profissional', controller.create);

  // Busca todos os profissionais
  app.get('/profissional', controller.findAll);
}