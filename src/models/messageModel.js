/*
regra de modelagem de dados, aonde enviará a messagem, a data da mensagem e o usuário.
*/

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    dataEnvio: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
