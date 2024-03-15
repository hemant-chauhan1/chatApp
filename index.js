const io = require("socket.io")(8000, {
    cors: "*"
})

let users = {}

io.on("connection", (socket) => {
    socket.on("joined", (name) => {
        if (name == "" || name == null || name == "null") { }
        else {
            users[socket.id] = name
            socket.broadcast.emit("new-user-joined", name)
        }
    })


    socket.on("send", (message) => {
        socket.broadcast.emit("receive", { name: users[socket.id], message })
    })

    socket.on("disconnect", () => {
        if (users[socket.id] == "" || users[socket.id] == null || users[socket.id] == "null") { }
        else {
            socket.broadcast.emit("left", users[socket.id])
            delete users[socket.id]
        }
    })
})

