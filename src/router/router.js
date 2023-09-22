const express = require('express');
const routes = express.Router();


/* 

siga os exemplos abaixo na hora de criar os demais controllers


*/ 

const userController = require('../controllers/userController');
//const Message  = require('./models/messageModel'); // Importe o modelo de mensagem


routes.post('/register', userController.createUser);

routes.put('/users/:id', userController.updateUser)



module.exports = routes;