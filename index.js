require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection} = require('./database/config');

const app = express();

// cors 
app.use(cors())

// Base de datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto ' + process.env.PORT);
});

