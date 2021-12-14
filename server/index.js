const express = require('express');
const app = express();
var path = require('path');
const cors = require('cors');
const env = require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

var adminAuthRoute = require('./routes/admin/auth');
var testRoute = require('./routes/test');
var addNewUserRoute = require('./routes/newUsers');
var allUserListRoute = require('./routes/home');



// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/admin', adminAuthRoute);

// const http = require('http').createServer(app);


mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.0rsnr.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    }
).then((dbo) => {
    // var dbo = db.db("mydb");
    // dbo.collection("user").findOne({}, function(err, result) {
    //     if (err) throw err;
    //     console.log(result.name);
    //     // db.close();
    //   });
    console.log("database connected");
})

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

let testArr = []
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log("Connected!", socket.id)

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, Welcome to the room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { usre: 'admin', text: `${user.name}. has joined!` });

        socket.join(user.room);
        console.log(name, room)

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    })

    socket.on('joinPrivateUser', ({ name, room }, callback) => {
        // const { error, user } = addUser({ id: socket.id, name, room, uid });

        // if (error) return callback(error);

        // const id = socket.id;
        testArr.push({ id: socket.id, room, name })
        socket.emit('PrivateMessage', { user: 'Admin', text: `Welcome to the Chat App!` });
        socket.join(room);
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        callback();
    });

    socket.on('sendPrivateMessage', (message, callback) => {
        testArr.map((hit) => {
            console.log(hit);
            if (hit.uid === message.room) {
                io.to(hit.id).emit('PrivateMessage', { user: message.uid, text: message.msg })
            }else{
                console.log("UserIsNotActive")
            }
        })
        // const user = getUser(socket.id);
        // console.log(user);
        // const user = getUser(message.name)
        // console.log(message)
        callback()
    })
    socket.on('disconnect', () => {
        console.log('User had left!');
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })
})

app.use(function (req, res, next) {
    req.io = io;
    next();
});

app.use('/api/test', testRoute);
app.use('/api/', addNewUserRoute);
app.use('/api/', allUserListRoute);

// http.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })

