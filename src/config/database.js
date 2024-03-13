import mongoose from 'mongoose';

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conectado a la base de datos');
});

export { mongoose, db };
