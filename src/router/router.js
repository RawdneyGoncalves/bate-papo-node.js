const express = require('express');
const routes = express.Router();


const userController = require('../controllers/userController');
const Message  = require('./models/messageModel'); // Importe o modelo de mensagem


app.post('/sendMessage', async (req, res) => {
    try {
        const { mensagem, username } = req.body

        // nova mensagem
        const novaMensagem = new Message({
            mensagem,
            username,
            dataEnvio: new Date(),
        })

        await novaMensagem.save()

        res.status(201).json({ message: 'A mensagem foi enviada com sucesso.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao enviar mensagem!' });
      }

    }
)