const express = require('express');
const http = require('http');
const { Server: SocketIoServer } = require('socket.io');
const ChatService = require('./modules/ChatModule/ChatService');


class Server {
    constructor(port = 5000) {
        this.port = port;
        this.app = express();
        this.server = http.createServer(this.app);
        this.config();
    }

    config() {
        let io = new SocketIoServer(this.server, {
            cors: { origin: "*" },
        });
        new ChatService(io);


    }

    start() {
        this.server.listen(this.port, () => {
            console.log('serveur démarré...' + this.port);
        })
    }

}

new Server().start();


