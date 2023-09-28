/* 
conectar o banco de dados mongodb,
usar os process envs( para que não fique salvado o login e senha do banco)

dica de ouro: o link de conexão irá vim assim: `mongodb+srv://${username}:${password}@cluster0.bnlrbze.mongodb.net/?retryWrites=true&w=majority

*/

const mongoose = require('mongoose');
require('dotenv').config(); // Carrega o .env

async function main() {
    try {
        mongoose.set("strictQuery", true);

        // Use as variáveis de ambiente para obter o nome de usuário e senha do banco de dados
        const usernameDatabase = process.env.DB_NAME;
        const passwordDatabase = process.env.DB_PASS;

        // URL
        const dbLink = `mongodb+srv://${usernameDatabase}:${passwordDatabase}@cluster0.irdz1ng.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`;

        await mongoose.connect(dbLink);

        console.log("Conectado ao banco!");
    } catch (error) {
        console.log(`Erro ${error}`);
    }
}

module.exports = main;


//module.exports = connect;