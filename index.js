const express = require('express');
const path = require('path');
require('dotenv').config();

//dbConfig
const { dbConeccion } = require('./database/config');
dbConeccion();

// App de Express
const app = express();

//Lectura y parseo del body de una peticion Http
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//Rutas
app.use('/api/login', require('./routes/auth'))

server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);

});