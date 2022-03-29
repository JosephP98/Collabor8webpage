const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
<<<<<<< Updated upstream
=======
const cors = require('cors');
const bp = require('body-parser');
>>>>>>> Stashed changes

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

require('dotenv').config()

const port = process.env.SRVR_PORT | 3001

// routes
const r_db = require('./api/routes/database/posts');

let c; // Make sure to replace this by storing image on DB

<<<<<<< Updated upstream
// app.use('/api/db', r_db);
=======
app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())

app.use('/api/db', r_db);
>>>>>>> Stashed changes

app.get('/', (req, res) => {
    res.send("Hello world");
});

io.on('connection', (socket) => {
    console.log(`user ${socket.id} connected`);

    socket.on('line', obj => {
        //console.log(obj);
        socket.emit('line', obj);
        socket.broadcast.emit('line', obj);
    });

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} disconnected`);
    });

    socket.on('save', obj => {
        console.log('saved');
        //console.log(obj);
        c = obj;
    });

    socket.emit('load', c);

    socket.on('message', m => {
        console.log(m.message);
        socket.emit('message', m);
        socket.broadcast.emit('message', m);
    });
});

httpServer.listen(port, () => { 
    console.log(`listening on -p ${port}`);
});