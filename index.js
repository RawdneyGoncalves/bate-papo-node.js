const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
require('./src/database/index');

app.options("*", cors());
const routes = require("./src/router/router.js");
app.use(express.json());
const PORT = process.env.PORT || 3030;

app.use(routes);
app.listen(PORT, ()=> { 
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});