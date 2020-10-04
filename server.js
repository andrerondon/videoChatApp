const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs') 
app.set('views', 'views')

app.use('/', (req, res)=>{
    res.redirect(`/${uuidV4()}`)
})
app.use('/room', (req, res)=>{
    res.render('room', { roomId: req.params.room})
})

io.on('connection', socket =>{
    socket.on('join-room', (roomId, userId)=>{
        socket.join(roomId)
        socket.join(roomId).broadcast.emit('user-connected', userId)
    })
})

server.listen(3000)
