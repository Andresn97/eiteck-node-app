
const express = require('express');
require('dotenv').config();

const app = express();

//Public Directory
app.use( express.static( 'public' ) );

app.use( express.json() );

//Routes
app.use('/api/auth', require('./routes/auth'));

//Configuración del Puerto
app.listen( process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});