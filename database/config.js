const mongoose = require('mongoose');


const dbConnection = async () => {
  try {
    
    await mongoose.connect( process.env.DB_CT );
    console.log('DB ONLINE');

  } catch (error) {
    console.log(error);
    throw new Error('Error al acceder a la base de datos');
  }
}

module.exports = {
  dbConnection
}