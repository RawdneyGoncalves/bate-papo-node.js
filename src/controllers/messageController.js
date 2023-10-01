/* aqui usaremos o controller para  fazer que nosso bate-papo funcione. usaremos basicamente o que estamos vendo na documentação
aqui também colocaremos o socket.io para rodar.
*/

const express = require('express');

const router = express.Router();

const mongoose = require('mongoose'); 

const messageModel = require('../models/messageModel');

exports.getMessage = async (req, res) => {
    //fazer a regra de negocio de captar mensagem basicamente como está na documentação
}



exports.postMessage = async (req, res) => {

    //fazer a regra de negocio de enviar mensagem
}