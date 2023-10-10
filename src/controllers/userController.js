
/* desafio: 

você vai ter que criptografar a senha que irá ser enserida no banco de dados, usar o bcrypt
assim que criptografar, você irá salvar os dados no banco de dados

verificar se você irá fazer mais validações(evitar fraude, ou macaquice na aplicação)

fazer os demais controllers de usuario: como update, delete, e busca por id

*/



const express = require("express");

const router = express.Router();

const mongoose = require('mongoose'); // Importe o mongoose

const User = require('../models/userModel');


var parse_email = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

exports.getUser = async (req, res) => { //feito
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ msg: "O valor de `id` deve ser um ObjectId válido" });
            return;
        }

        // Use o modelo User para buscar o usuário pelo ID
        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({ msg: "Usuário não encontrado" });
            return;
        }

       res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ocorreu um erro ao buscar o usuário" });
    }
};

exports.getAllUser = async (req, res) => { try {
    const users = await User.find({});
    res.json(users);
} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocorreu um erro ao buscar os usuários" });
}
  };



exports.deleteUser = async (req, res) => { 
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ msg: "O valor de `id` deve ser um ObjectId válido" });
            return;
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            res.status(404).json({ msg: "Usuário não encontrado" });
            return;
        }

        res.status(200).json({ msg: "Usuário deletado com sucesso" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ocorreu um erro ao buscar o usuário" });
    }
};







exports.createUser = async (req, res) => { //feito 
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(403).send({
                message: "Alguns atributos não foram passados, verifique e tente novamente!"
            });
        }

        if (username.length > 17 || username.length < 6) {
            return res.status(403).send({
                message: "Usuário deve ter entre 6 e 17 caracteres"
            });
        }

        const isExistUsername = await User.findOne({ username });

        if (isExistUsername) {
            return res.status(403).send({ message: "Esse username já foi criado, por favor, tente outro." });
        }

        if (password.length < 6 || password.length > 17) {
            return res.status(403).send({
                message: "Senha deve ter entre 6 e 17 caracteres"
            });
        }

        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Erro ao criar usuário" });
            }

            const novoUsuario = new User({
                username,
                password: hash
            });

            await novoUsuario.save();

            return res.status(200).send({
                message: "O usuário foi criado com sucesso"
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `${error}` });
    }
};



exports.updateUser = async (req, res) => { // feito
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(403).send({
                message: "Alguns atributos não foram passados, verifique e tente novamente!"
            });
        }

        if (username.length > 17 || username.length < 6) {
            return res.status(403).send({
                message: "Usuário deve ter entre 6 e 17 caracteres"
            });
        }

        const isExistUsername = await User.findOne({ username });

        if (isExistUsername) {
            return res.status(403).send({ message: "Esse username já foi criado, por favor, tente outro." });
        }

        if (password.length < 6 || password.length > 17) {
            return res.status(403).send({
                message: "Senha deve ter entre 6 e 17 caracteres"
            });
        }

        const id = req.params.id;

        const dadosUser = {
            username: req.body.username,
            password: req.body.password
        }

        bcrypt.hash(dadosUser.password, saltRounds, async (err, hash) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Erro ao atualizar usuário" });
            }

            dadosUser.password = hash;

            const updatedService = await User.findByIdAndUpdate(id, dadosUser);

            if (!updatedService) {
                res.status(404).json({ msg: "Usuário não encontrado" });
                return;
            }

            res.status(200).json({ msg: "Usuário atualizado com sucesso" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `${error}` });
    }
}