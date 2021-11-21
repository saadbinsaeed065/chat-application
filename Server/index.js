//   handle socket io connections
const http= require('http')
const express= require('express')
const cors = require('cors')
const socketio= require('socket.io')

const app=express()
const port= process.env.PORT

app.use(cors());

app.get('/', (req,res)=>{
    res.send('hello its working')
})

// THIS IS THE ACTUAL SERVER WHICH IS RUNNING
const server=http.createServer(app)

const io= socketio(server)

 const users= [{}]

io.on('connection', (socket)=>{

                //on mean we are recieving frontend data
            socket.on('joined', ({user})=>{

                users[socket.id]= user
                console.log(`${user}  has joined `);

                //person who send msg except this person everyone recieves msg
            socket.broadcast.emit('userjoined', {user:'Admin', message:`${users[socket.id]} has joined`})

            socket.emit('welcome', {user:'Admin', message:`welcome to the chat, ${users[socket.id]}`})

   })

   
   socket.on('message', ({message, id})=>{
             //if we want to send data to all over the socket
            io.emit('sendmessage', {user:users[id], message, id})
   })


   socket.on('disconnect', ()=>{

                socket.broadcast.emit('leave', {user:'Admin', message:`${users[socket.id]} has left`})
                console.log('user left');
   })

    })


//     //if someone send msg fire this event
//     socket.on('send', message=>{
//          socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
//     })
// })



server.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
})
