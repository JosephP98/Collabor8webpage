const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();
const bp = require('body-parser');
//const db_func = require('./api/controllers/database/postController');

app.use(bp.urlencoded({extended: false}));
app.use(bp.json());

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
    }
});

require('dotenv').config();

const port = process.env.SRVR_PORT | 3001;

// routes
const r_db = require('./api/routes/database/posts');
app.use('/api/db', r_db);

// -> 643502d2-b545-429b-b9a2-b4c569079fa0
let c; // Make sure to replace this by storing image on DB
app.get('/', (req, res) => {
    res.send("Hello world");
});

io.on('connection', (socket) => {
    console.log(`user ${socket.id} connected`);

    socket.on('join', o => {
        console.log("joinning " + o.room);
        socket.join(o.room);
    });

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
        //db_func.server_store_image(req, res);
        // TODO: change to work without socket.io
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