const express = require('express');
const routes = express.Router();


/* 

siga os exemplos abaixo na hora de criar os demais controllers


*/ 

const userController = require('../controllers/userController');
//const Message  = require('./models/messageModel'); // Importe o modelo de mensagem

routes.route('/users/').get(userController.getAllUser);

routes.route('/deleteUser/:id').delete(userController.deleteUser);

routes.route('/users/:id').get (userController.getUser)

routes.route('/register').post (userController.createUser);

routes.route('/users/:id').put (userController.updateUser)

//routes.delete('/users/:id', userController.deleteUser)


module.exports = routes;



