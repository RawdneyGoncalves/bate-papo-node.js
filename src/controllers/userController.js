
/* desafio: 

você vai ter que criptografar a senha que irá ser enserida no banco de dados, usar o bcrypt
assim que criptografar, você irá salvar os dados no banco de dados

verificar se você irá fazer mais validações(evitar fraude, ou macaquice na aplicação)

fazer os demais controllers de usuario: como update, delete, e busca por id

*/



const express = require("express");

const router = express.Router();

const User = require('../models/userModel');
var parse_email = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;


exports.createUser = async (req, res) => {
    try {

       const {username, password} = req.body
       if(!username || !password){
        return res.status(403).send({
            message: "Alguns atributos não foram passados, verifique e tente novamente!"
        });
       }

       //verificação de usuário

       if(username.length > 17){
        return res.status(403).send({
            message: "Usuário muito grande, tente outro menor"
        });
       }

       if(username.length < 6){
        return res.status(403).send({
            message: "Usuário muito pequeno, tente um maior"
        });
       }


       // puxa se o usuario existe
       const isExistUsername = await User.findOne({username})

       if(isExistUsername){
        return res.status(403).send({message: "Esse username já criado, por favor tente outro. "});
       }

       // Verificação de senhas

       if(password.length < 6){
        return res.status(403).send({
            message: "Senha muito pequena, tente outra maior"
        });
       }

       if(password.length > 17){
        return res.status(403).send({
            message: "Senha muito grande, tente uma menor"
        });
       }



    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `${error}` });
      }
    }



exports.updateUser = async(req,res) => {

    }
    

