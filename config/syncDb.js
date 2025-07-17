const sequelize = require('./database.js');

require('../models/produto');
require('../models/usuario');

async function syncDatabase() {
  console.log('Iniciando sincronização forçada com o banco de dados...');
  try {
    await sequelize.sync({ force: true });
    console.log('Banco de dados sincronizado com sucesso! As tabelas foram recriadas.');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();