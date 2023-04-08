
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


const app = express();

//DB
dbConnection();

//CORS
app.use( cors() );

//Public Directory
app.use( express.static( 'public' ) );

app.use( express.json() );

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

//Configuración del Puerto
app.listen( process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});