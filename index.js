
const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');
// const swaggerUi = require('swagger-ui-express');
// const { swaggerSpec } = require('./helpers/swagger');


const app = express();

//DB
dbConnection();

//CORS
app.use( cors() );

//Public Directory
app.use( express.static( 'public' ) );

app.use( express.json() );

//Swagger
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/bread-box', require('./routes/bread-box'));
app.use('/api/order', require('./routes/order'));
app.use('/api/shipment', require('./routes/shipment'));

//Configuración del Puerto
app.listen( process.env.PORT || 4000, () => {
  console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});