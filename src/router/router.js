const express = require('express');
const routes = express.Router();


/* 

siga os exemplos abaixo na hora de criar os demais controllers


*/ 

const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

/* Controller de usuários*/
routes.route('/users/').get(userController.getAllUser);

routes.route('/users/:id').get (userController.getUser)

routes.route('/register').post (userController.createUser);

routes.route('/users/:id').put (userController.updateUser)

routes.route('/deleteUser/:id').delete(userController.deleteUser);

/*  fazer o controller de message*/

module.exports = routes;



