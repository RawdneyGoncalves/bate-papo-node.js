const express = require('express');
const routes = express.Router();


const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

routes.route('/users/').get(userController.getAllUser);

routes.route('/users/:id').get (userController.getUser)

routes.route('/register').post (userController.createUser);

routes.route('/users/:id').put (userController.updateUser)

routes.route('/deleteUser/:id').delete(userController.deleteUser);



routes.route('/messages').post(messageController.postMessage);

routes.route('/messages').get(messageController.getMessage);

module.exports = routes;



