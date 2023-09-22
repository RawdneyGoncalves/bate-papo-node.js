/* 
conectar o banco de dados mongodb,
usar os process envs( para que não fique salvado o login e senha do banco)

dica de ouro: o link de conexão irá vim assim: `mongodb+srv://${username}:${password}@cluster0.bnlrbze.mongodb.net/?retryWrites=true&w=majority

*/

const usernameDatabase = process.env.DB_NAME
const passawordDatabase = process.env.DB_PASS

try {

    
} catch (error) {
    console.log("este aqui foi o erro", error)
}



module.exports = connect;