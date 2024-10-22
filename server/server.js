import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { WebSocketServer } from "ws"
import authroute from './Routes/authroute.js'
import userroutes from './Routes/userroutes.js'
//! data structure to stoer user data on server
export const roomId_to_user = new Map()//* roomId : [socketId]
export const user_to_roomId = new Map()//* username : roomId
export const onlinr_user = new Map() //* username : {socketId,userId}
//! data structure to stoer user data on server
const server = express();
server.use(cookieparser())
server.use(express.json());
dotenv.config()
server.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH'],
}));
const s = server.listen(8000, async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Server listening on port 8000');
    } catch (error) {
        console.log(error.message);
    }
});
const wss = new WebSocketServer({ noServer: true });

//!import helper functions
import parseUrl from './HelperFunctions/parseUrl.js';
import chat_room from './HelperFunctions/chat_room.js';
import closeConection from './HelperFunctions/closeConection.js';
// import mongoose from 'mongoose';
//!import helper functions

//! Normal Express server routes
server.use('/api/v1/user/auth', authroute)
//* send offlinemessages and friends while login so that we can display it on client side
server.use('/api/v1/user', userroutes)
server.get('/', (req, res) => {
    res.status(201).json({ 'mes': "server running properly" })
})

//! Normal Express server routes

//! WebSocket server handling
s.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (socket) => {
        parseUrl(req, socket)

        wss.emit('connection', socket, req);
        console.log(`upgrade request`);
    });
})
wss.on('connection', (socket, req) => {
    socket.on('message', (message) => {
        //* message:{sender:'',,reciver:'',,message:'',}
        //* first check if reciver is online if yes find the socket for reciver and send message and push to DB as well
        //* if not push to offline message
        chat_room(socket, message, req)
    })
    socket.on('close', () => {
        closeConection(req)
    });
})
//! WebSocket server handling

