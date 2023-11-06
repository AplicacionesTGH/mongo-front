const mongo = require('mongoose');

mongo.connect((process.env.MONGODB_URL || `mongodb://localhost:27017/prueba`), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:'+error);
  });

