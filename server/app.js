require('dotenv').config()
const express = require('express'),
    http = require('http'),
    { v4: uuidv4 } = require('uuid'),
    cors = require('cors'),
    twilio = require('twilio');



const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app)

app.use(cors())

let connectedUsers = [], rooms = []
console.log(rooms)
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})


app.get('/api/room/:roomId', (req, res) => {
    const { roomId } = req.params;

    const room = rooms.find((room) => room.id === roomId)

    if (room) {
        if (room.connectedUsers.length > 4) {
            return res.send({
                roomExists: true,
                full: true
            })
        }
        return res.send({
            roomExists: true,
            full: false
        })
    }
    return res.send({
        roomExists: false
    })
})

app.get("/api/get-turn-credentials", (req, res) => {
    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_KEY;

    const client = twilio(accountSid, authToken);

    res.send({ token: null });
    try {
        client.tokens.create().then((token) => {
            res.send({ token });
        });
    } catch (err) {
        console.log("error occurred when fetching turn server credentials");
        console.log(err);
        res.send({ token: null });
    }
});


io.on('connection', (socket) => {
    console.log(`user connected ${socket.id}`)

    socket.on('create-room', (data) => {
        console.log(`${data.name} just created a new room`)
        createNewRoom(data, socket)
    })

    socket.on('join-room', (data) => {
        console.log(`${data.name} just joined a new room`)
        joinRoom(data, socket)
    })
    socket.on('disconnect', () => {
        disconnectHandler(socket)
    })
    socket.on('conn-signal', (data) => {
        signalingHandler(data, socket)
    })
    socket.on('conn-init', data => {
        initConnectHandler(data, socket)
    })
})

// Create a room
const createNewRoom = (data, socket) => {

    const roomId = uuidv4(),
        newUser = {
            name: data.name,
            id: uuidv4(),
            socketId: socket.id,
            roomId,
            onlyAudio: data.onlyAudio
        }

    connectedUsers = [...connectedUsers, newUser]

    const newRoom = {
        id: roomId,
        connectedUsers: [newUser]
    }
    socket.join(roomId)
    rooms = [...rooms, newRoom]

    socket.emit('room-id', { roomId })
    socket.emit('room-update', {
        connectedUsers: newRoom.connectedUsers
    })

}

// Join a room
const joinRoom = (data, socket) => {
    console.log(data)
    const newUser = {
        name: data.name,
        id: uuidv4(),
        socketId: socket.id,
        roomId: data.roomId,
        onlyAudio: data.onlyAudio
    }
    console.log(rooms)
    const room = rooms.find(room => room.id === data.roomId)

    room.connectedUsers = [...room.connectedUsers, newUser]

    socket.join(data.roomId)
    connectedUsers = [...connectedUsers, newUser]

    room.connectedUsers.forEach(user => {
        if (user.socketId !== socket.id) {
            const data = {
                connUserSocketId: socket.id
            }
            io.to(user.socketId).emit('conn-prepare', data)
        }
    });

    io.to(data.roomId).emit('room-update', {
        connectedUsers: room.connectedUsers
    })

}

const disconnectHandler = (socket) => {
    const user = connectedUsers.find(user => user.socketId === socket.id)

    if (user) {
        // remove user from room
        const room = rooms.find(room => room.id === user.roomId)
        room.connectedUsers = room.connectedUsers.filter(user => user.socketId !== socket.id)

        // Leave room
        socket.leave(user.roomId)

        if (room.connectedUsers.length > 0) {
            // emit to all users which are still in the room that user disconnected
            io.to(room.id).emit("user-disconnected", { socketId: socket.id });

            // emit an event that user just left
            io.to(room.id).emit('room-update', {
                connectedUsers: room.connectedUsers
            })
        }
        else {
            rooms = rooms.filter(r => r.id !== room.id)
        }

    }
}

const signalingHandler = (data, socket) => {
    const { connUserSocketId, signal } = data;
    const signalingData = {
        signal,
        connUserSocketId: socket.id
    }
    io.to(connUserSocketId).emit('conn-signal', signalingData)
}

// Information from clients already in the room that They have prepared for incoming connection
const initConnectHandler = (data, socket) => {

    const { connUserSocketId } = data
    const initData = {
        connUserSocketId: socket.id
    }
    io.to(connUserSocketId).emit("conn-init", initData)
}

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})