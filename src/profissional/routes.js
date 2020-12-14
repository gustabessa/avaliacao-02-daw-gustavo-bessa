module.exports =  (app) => {
  const controller = require('./controller')
  
  // Criar novo profissional
  app.delete('/profissional', controller.destroy);
  
  // Criar novo profissional
  app.post('/profissional', controller.create);
  
  // Atualizar profissional
  app.put('/profissional', controller.update);

  // Busca todos os profissionais
  app.get('/profissional', controller.findAll);

  // Busca um profissional
  app.get('/profissional/:id', controller.findOne);

  // Busca um profissional
  app.get('/profissional/cpf/:cpf', controller.findOneByCpf);
}