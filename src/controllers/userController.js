const express = require("express");

const router = express.Router();

const User = require('./models/user');


exports.createUser = async (req, res) => {
    try {
        const { username } = req.body //tenta criar uma conta com o username

        const validarUser = await User.findOne({ username }); // assincrona para verificar se o usuário existe baseado no 'username'

        if (usuarioExistente) {
            return res.status(400).json({ message: 'Já possui um usuário com esse nome cadastrado' })
        }
        // apos as validações, agora vai criar um usuario

        const novoUser = new User({ username })

        await novoUser.save()

        // resposta é enviada com sucesso
        res.status(201).json({ message: 'O Usuário foi criado com sucesso.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o usuário.' });
      }
    }

    

