const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const router = express.Router();

const saltRounds = 10;

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ msg: 'O valor do `id` deve ser um ObjectId válido' });
            return;
        }

        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({ msg: 'Usuário não encontrado' });
            return;
        }

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ocorreu um erro ao buscar o usuário' });
    }
};

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ocorreu um erro ao buscar os usuários' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ msg: 'O valor do `id` deve ser um ObjectId válido' });
            return;
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            res.status(404).json({ msg: 'Usuário não encontrado' });
            return;
        }

        res.status(200).json({ msg: 'Usuário deletado com sucesso' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ocorreu um erro ao excluir o usuário' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(403).send({
                message: 'Estão faltando alguns atributos, verifique e tente novamente.'
            });
        }

        if (username.length > 17 || username.length < 6) {
            return res.status(403).send({
                message: 'O nome de usuário deve ter entre 6 e 17 caracteres.'
            });
        }

        const isExistUsername = await User.findOne({ username });

        if (isExistUsername) {
            return res.status(403).send({ message: 'Este nome de usuário já foi escolhido, por favor, escolha outro.' });
        }

        if (password.length < 6 || password.length > 17) {
            return res.status(403).send({
                message: 'A senha deve ter entre 6 e 17 caracteres.'
            });
        }

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao criar o usuário' });
            }

            const newUser = new User({
                username,
                password: hash
            });

            await newUser.save();

            return res.status(200).send({
                message: 'O usuário foi criado com sucesso'
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `${error}` });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(403).send({
                message: 'Estão faltando alguns atributos, verifique e tente novamente.'
            });
        }

        if (username.length > 17 || username.length < 6) {
            return res.status(403).send({
                message: 'O nome de usuário deve ter entre 6 e 17 caracteres.'
            });
        }

        const isExistUsername = await User.findOne({ username });

        if (isExistUsername) {
            return res.status(403).send({ message: 'Este nome de usuário já foi escolhido, por favor, escolha outro.' });
        }

        if (password.length < 6 || password.length > 17) {
            return res.status(403).send({
                message: 'A senha deve ter entre 6 e 17 caracteres.'
            });
        }

        const id = req.params.id;

        const userData = {
            username: req.body.username,
            password: req.body.password
        }

        bcrypt.hash(userData.password, saltRounds, async (err, hash) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao atualizar o usuário' });
            }

            userData.password = hash;

            const updatedUser = await User.findByIdAndUpdate(id, userData);

            if (!updatedUser) {
                res.status(404).json({ msg: 'Usuário não encontrado' });
                return;
            }

            res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `${error}` });
    }
};
