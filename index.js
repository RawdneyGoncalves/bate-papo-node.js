const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3030;


// conectar ao mongoose
require('./src/database/index');

app.options("*", cors());

// importar router
const routes = require("./src/router/router.js");

//Middleware que recebe um valor em json 
app.use(express.json());

//

app.use(routes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});