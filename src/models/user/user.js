const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Garante que o nome de usuário seja exclusivo
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;