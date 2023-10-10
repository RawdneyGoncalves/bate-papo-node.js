const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 3030;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

require('./src/database/index');

const routes = require('./src/router/router.js');

app.use(express.json());

app.use(express.static(__dirname + '/src/public'));

io.on('connection', (socket) => {
    console.log('Um cliente se conectou');

    socket.on('disconnect', () => {
        console.log('Um cliente se desconectou');
    });

    socket.on('chat message', (message) => {
        messageController.postMessage({ body: { message } }, { sendStatus: () => { } });
    });
});

app.use(routes);

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = {
    io,
};
