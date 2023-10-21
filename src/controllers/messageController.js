const express = require('express');
const { io } = require('../../index');
const router = express.Router();
const mongoose = require('mongoose');
const Message = require('../models/messageModel');
const User = require('../models/userModel');

exports.postMessage = async (req, res) => {
    try {
        const { id, message } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'O valor do `id` deve ser um ObjectId válido' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        const newMessage = new Message({ message, user: user._id }); 

        const savedMessage = await newMessage.save();

        console.log(savedMessage);
        console.log('Mensagem salva');
        res.sendStatus(200);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ message: 'Ocorreu um erro ao postar a mensagem' });
    } finally {
        console.log('Mensagem postada');
    }
};
