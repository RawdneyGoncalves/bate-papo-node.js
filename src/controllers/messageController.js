const express = require('express');
const { io } = require('../../index'); 
const router = express.Router();
const mongoose = require('mongoose');
const Message = require('../models/messageModel');
const userController = require('../controllers/userController');

exports.getMessage = async (req, res) => {
    const user = userController.getUser();
    Message.find({ name: user }, (err, messages) => {
        res.send(messages);
    });
}

exports.postMessage = async (req, res) => {
    try {
        const user = userController.getUser();

        const message = new Message({ ...req.body, name: user });
        const savedMessage = await message.save();
        console.log('Message saved');

        const censored = await Message.findOne({ message: 'badword' });
        if (censored) {
            await Message.remove({ _id: censored.id });
        } else {
            io.emit('message', { ...req.body, name: user }); 
            res.sendStatus(200);
        }
    } catch (error) {
        res.sendStatus(500);
        return console.log('Error:', error);
    } finally {
        console.log('Message Posted');
    }
}
