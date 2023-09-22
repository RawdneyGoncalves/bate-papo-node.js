const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Garante que o nome de usuário seja exclusivo
    },
    password: {
        type: String,
        required: true
    }, 
    CreatedAt: {
        type: Date, 
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;