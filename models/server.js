const express = require('express')
const cors = require('cors');
const { socketController } = require('../sockets/sockets.controller');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.path = {}


        //Middlewares de la aplicación
        this.middlewares();

        //Rutas de la aplicación
        this.routes();

        //Config Socket
        this.Sockets()
    }


    middlewares(){

        //CORS
        this.app.use(cors());

        //Directorio Público
        this.app.use(express.static('public'));
    }

    routes (){
        //this.app.use(this.path.auth,        require('../routes/auth'))
    }

    Sockets(){
        this.io.on('connection', socketController);
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en ', this.port)
        });
    }
}

module.exports = Server;