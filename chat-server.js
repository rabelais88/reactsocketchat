const express = require('express')
const app = express()
const server = require('http').createServer(app)

const srv = server.listen(process.env.PORT || 3000, ()=>{
  console.log("chat server is up at ", srv.address().port)
})

app.use('/public',express.static('./public'))
app.get('/',(req,res) => {
  res.redirect(302,'/public')
})

const socketio = require('socket.io')
const io = socketio.listen(server)
io.on('connection',(skt) => {
  console.log('사용자 접속:',skt.client.id)
  skt.on('chat-msg', (msg)=>{
    console.log('message:',msg)
    io.emit('chat-msg',msg)
  })
})
