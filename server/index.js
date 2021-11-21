const express = require('express');
const app = express();
var path = require('path');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

const http = require('http').createServer(app);

const PORT = process.env.PORT || 5000;




http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



// app.get('/', (req, res) => {
//     // console.log("done")
//     res.send("done")
//     // res.sendFile(__dirname, './index.html');
// })

const io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log("Connected!", socket.id)

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, Welcome to the room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { usre: 'admin', text: `${user.name}. has joined!` });

        socket.join(user.room);
        // console.log(name, room)

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });
    socket.on('disconnect', () => {
        console.log('User had left!');
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })
    // socket.on('message', (msg) =>{
    //     // console.log(msg)
    //     socket.broadcast.emit('message', msg)
    // })
})