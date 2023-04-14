import express from "express";
import morgan from "morgan";
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/messages.routes.js'
import userRoutes from './routes/user.routes.js'
import { Server as SocketServer } from "socket.io";
import http from 'http'

const app = express();


app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);
app.use('/user', userRoutes)

export const server = http.createServer(app);
const io = new SocketServer(server,  {  cors: {
    origin: "*",
    // credentials: true,
    // rejectUnauthorized: false
  },});


global.onlineUsers = new Map();
io.on("connection", (socket) => {
    console.log("user connected", socket.id)
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });

export default app;


