const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");


app.use(cors({
  origin: "http://localhost:5174", // frontend origin
  methods: ["GET", "POST"],
  credentials: true
}));

// Set up Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174", // frontend origin
    methods: ["GET", "POST"],
    credentials: true
  }
});
app.use(express.json())


let majorityVote = 'Vinit'



app.get('/', (req, res) => {
   io.emit('updated-name', majorityVote)
  res.send(majorityVote)
})

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.post('/set', (req, res) => {
  majorityVote = req.body.name 
  io.emit('updated-name', majorityVote)
  res.send('Name set successfully')
})



server.listen(port, () => {
  console.log(`Voting app listening on port ${port}`)
})
