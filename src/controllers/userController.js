
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

        // Verifica se o valor de `id` é um ObjectId válido
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

exports.getAllUser = async (req, res) => { //feito
    try {
      // Use o modelo User para buscar todos os usuários
      const users = await User.find({});
  
      // Retorna os usuários
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ocorreu um erro ao buscar os usuários" });
    }
  };



exports.deleteUser = async (req, res) => { 
    try {
        const id = req.params.id;

        // Verifica se o valor de `id` é um ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ msg: "O valor de `id` deve ser um ObjectId válido" });
            return;
        }

        // Use o modelo User para buscar o usuário pelo ID
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            res.status(404).json({ msg: "Usuário não encontrado" });
            return;
        }

        res.status(200).json({msg: "Usuário deletado com sucesso"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ocorreu um erro ao buscar o usuário" });
    }
};







exports.createUser = async (req, res) => { //feito 
    try {

        const { username, password } = req.body
        if (!username || !password) {
            return res.status(403).send({
                message: "Alguns atributos não foram passados, verifique e tente novamente!"
            });
        }

        //verificação de usuário

        if (username.length > 17) {
            return res.status(403).send({
                message: "Usuário muito grande, tente outro menor"
            });
        }

        if (username.length < 6) {
            return res.status(403).send({
                message: "Usuário muito pequeno, tente um maior"
            });
        }


        // puxa se o usuario existe
        const isExistUsername = await User.findOne({ username })

        if (isExistUsername) {
            return res.status(403).send({ message: "Esse username já criado, por favor tente outro. " });
        }

        // Verificação de senhas

        if (password.length < 6) {
            return res.status(403).send({
                message: "Senha muito pequena, tente outra maior"
            });
        }

        if (password.length > 17) {
            return res.status(403).send({
                message: "Senha muito grande, tente uma menor"
            });
        }

        const novoUsuario = new User({
            username,
            password
        })

        await novoUsuario.save()

        return res.status(200).send({
            message: "O usuário foi criado com sucesso"
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `${error}` });
    }
}



exports.updateUser = async (req, res) => { // feito
    try {

        const { username, password } = req.body
        if (!username || !password) {
            return res.status(403).send({
                message: "Alguns atributos não foram passados, verifique e tente novamente!"
            });
        }

        //verificação de usuário

        if (username.length > 17) {
            return res.status(403).send({
                message: "Usuário muito grande, tente outro menor"
            });
        }

        if (username.length < 6) {
            return res.status(403).send({
                message: "Usuário muito pequeno, tente um maior"
            });
        }


        // puxa se o usuario existe
        const isExistUsername = await User.findOne({ username })


        // Verificação de senhas

        if (password.length < 6) {
            return res.status(403).send({
                message: "Senha muito pequena, tente outra maior"
            });
        }

        if (password.length > 17) {
            return res.status(403).send({
                message: "Senha muito grande, tente uma menor"
            });
        }

        const id = req.params.id

        const dadosUser = {
            username: req.body.username,
            password: req.body.password
        }

        const updatedService = await User.findByIdAndUpdate(id, dadosUser)
        
        if(!updatedService){
            res.status(404).json({msg: "Usuário não encontrado"});
            return;
        }
    
        res.status(200).json({msg: "Usuário atualizado com sucesso"})



    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `${error}` });
    }
}