const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
    }
);

io.on('connection', (socket) => {
    socket.on("send_message", (data)=>{
        socket.broadcast.emit("receive_message", data)
    })

    socket.on("send_state", (data)=>{
        socket.broadcast.emit("receive_state", data)
    })

    socket.on("join", (data) => {
        socket.broadcast.emit("user_join", data)
    });

    socket.on("call", (data) => {
        socket.broadcast.emit("incoming_call", data)
    });




    // socket.emit("me", socket.id)

	// socket.on("disconnect", () => {
	// 	socket.broadcast.emit("callEnded")
	// })

	// socket.on("callUser", (data) => {
	// 	io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	// })

	// socket.on("answerCall", (data) => {
	// 	io.to(data.to).emit("callAccepted", data.signal)
	// })
}
);

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});
