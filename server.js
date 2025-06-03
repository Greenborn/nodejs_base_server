const config = require('dotenv').config()
global.config = config.parsed
console.log(global.config)

const express = require("express")
const app_admin = require('express')();
const server_admin = require('http').Server(app_admin);
const cors = require('cors')
const Session = require('express-session')
const bodyParser = require("body-parser")
const knex = require('./knexfile.js');
const LogOperacion = require('./controllers/log_operaciones.js');

const cors_origin = global.config.cors_origin.split(' ')
var corsOptions = {
    credentials: true,
    origin: cors_origin
}
app_admin.use(cors(corsOptions))

app_admin.use(bodyParser.json({ limit: '5mb', extended: true }))

app_admin.use(Session({
    secret: 'admin_session_secret',
    saveUninitialized: false,
    resave: true,
}))

app_admin.use('/api/auth', require('./routes/auth.js'));
app_admin.use('/api/users', require('./routes/user.js'));
app_admin.use('/api/log', require('./routes/log.js'));

server_admin.listen(global.config.service_port_admin)
console.log("Servidor API Admin escuchando en  ", global.config.service_port_admin)
setTimeout(async () => {
    await LogOperacion(0, 'Se inicia el servidor', null, new Date());
}, 1000)