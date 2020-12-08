module.exports =  (app) => {
  const controller = require('./controller')
  
  // Criar nova escolaridade
  app.post('/escolaridade', controller.create);

  // Busca todas as escolaridades
  app.get('/escolaridade', controller.findAll);
}