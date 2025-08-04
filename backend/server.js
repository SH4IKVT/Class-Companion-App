const express = require('express');
const path = require("path");
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// const morgan = require('morgan');
const connectDb = require('./config/db');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const port = 4080;

// Security & performance
app.use(helmet());
app.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
  }
});

// On client connect: you can auto‐join rooms here if needed
io.on('connection', socket => {
  console.log('Socket connected:', socket.id);
   socket.on('error', err => console.error('🚨 Socket error:', err));

  // Example: join class room if sent in handshake
  // const { classId, role } = socket.handshake.auth;
  // if (role === 'student' && classId) {
  //   socket.join(`class_${classId}`);
  // }

  socket.on('disconnect', reason => {
    console.log('Socket disconnected:', socket.id, reason);
  });
});

// Make io available in all routes via req.io
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Middlewares
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));
// app.use(morgan('dev'));
app.use(cookieParser())

// Routes
app.use('/announcements', require('./routes/announcements'));
app.use('/uploads', express.static(path.join(__dirname, "uploads")));
app.use('/notes', require('./routes/notes'));
app.use('/assignments', require('./routes/assignments'));
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.get('/',require('./middleware/verifyJwt'), (req, res) => {
    res.json({upStatus:'Backend is running',user:req.user});
});
app.use('/logout', require('./routes/logout'));

// Start server after DB connection
connectDb().then(() => {
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});