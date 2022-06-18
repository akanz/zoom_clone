const express = require('express'),
    http = require('http'),
    { v4: uuidv4 } = require('uuid'),
    cors = require('cors'),
    twilio = require('twilio');



const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app)

app.use(cors())

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log(`user ${socket.id} connected`)

    socket.on('create-room', (data) => {
        console.log(`${data.name} just created a new room`)
    })
})

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})