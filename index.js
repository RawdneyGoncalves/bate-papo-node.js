const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const http = require('http').createServer(app); 
const io = require('socket.io')(http); 
const PORT = process.env.PORT || 3030;



// conectar ao mongoose
require('./src/database/index');

//pp.options("*", cors());

// importar router
const routes = require("./src/router/router.js");

//Middleware que recebe um valor em json 
app.use(express.json());

app.use(express.static(__dirname + './src/public'));


app.use(routes);

http.listen(PORT, () => { 
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});