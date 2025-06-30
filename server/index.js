const express = require('express')
const connectDB = require('./config/dbconfig')
const dotenv = require('dotenv') ; 
const http = require('http') ; 
const {Server} = require('socket.io')
const cors = require('cors') ;
const cookieParser = require('cookie-parser');
const authRoute = require('./route/authRoute')


dotenv.config({
  path : './.env'
})

const PORT = process.env.PORT ;

const app = express() ;
const httpServer = http.createServer(app) ;
const port = 3000 ; 
const corsOrigins = process.env.CORS_ORIGIN.split('.')  ;

const io = new Server(httpServer , {
  cors : {
    origin : corsOrigins
  }
})

const corsOptions = {
  origin : corsOrigins , 
  credentials : true ,
}

app.use(cors(corsOptions)) ; 
app.use(express.json({limit : "16kb"})) ;
app.use(express.urlencoded({
  extended : true , 
  limit : "16kb"
})) ;
app.use(cookieParser()) ;

app.use("/api/auth" , authRoute) ;

let connections = [] ;

io.on('connection' , (socket) => {
  connections.push(socket) ; 
  console.log(`New user connected : ${socket.id}`) ; 


  socket.on('createRoom' , ({roomName}) => {
    console.log(`${socket.id} created room : ${roomName}`) ; 
    socket.join(roomName) ;
  })
  socket.on('disconnect' , (reason) => {
    connections = connections.filter((con) => con.id !== socket.id) ;
  })
})


connectDB().then(() => {
  httpServer.listen(PORT || 8800 , () => {
    console.log(`⚙️  Server is running at port : ${PORT}`) ; 
    app.get('/' , (req , res) => {
      res.status(201).send("Hi, from index.js ! Your server is running successfully.");
    })
  })
}).catch((error) => {
    console.log("Error starting the server !!" , error) ;
})