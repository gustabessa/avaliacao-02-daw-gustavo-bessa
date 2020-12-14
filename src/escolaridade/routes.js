module.exports =  (app) => {
  const controller = require('./controller')
  
  // Criar nova escolaridade
  app.post('/escolaridade', controller.create);
  
  // Criar nova escolaridade
  app.delete('/escolaridade', controller.destroy);

  // Busca todas as escolaridades
  app.get('/escolaridade', controller.findAll);
}