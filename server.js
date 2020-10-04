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
app.use('/:room', (req, res)=>{
    res.render('room', { roomId: req.params.room})
})

const DOMAIN = '0.0.0.0'
const PORT = process.env.PORT || 4000;

app.listen(PORT, DOMAIN, () => {

  console.log(`Server is listening on ${DOMAIN}:${PORT}`)
})
