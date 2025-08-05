const express = require('express');
const path = require("path");
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// const morgan = require('morgan');
const connectDb = require('./config/db');
const cookieParser = require('cookie-parser');
const { WebSocketServer } = require('ws');
const wsMiddleware = require('./middleware/wsMiddleware');
const sendNotification = require('./lib/sendNotification');
const WsStore = require('./lib/wsStore');

require('dotenv').config();

const app = express();
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


// Routes

app.use('/uploads', express.static(path.join(__dirname, "uploads")));
app.use('/notes', require('./routes/notes'));
app.use('/assignments', require('./routes/assignments'));
app.post("/custom-notification",require('./middleware/verifyJwt'), (req, res) => {
  
  const user = req.user;
  const {type, message, postId} = req.body;
  sendNotification(type, message,postId, user);
  res.status(200).json({ message: 'Notification sent successfully' });
})
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));

app.get('/',require('./middleware/verifyJwt'), (req, res) => {
  res.json({upStatus:'Backend is running',user:req.user});
});
app.use('/logout', require('./routes/logout'));
app.use('/notifications',require('./middleware/verifyJwt'), require('./routes/notification'));
app.use('/announcements', require('./routes/announcements'));
const server = http.createServer(app);
const wss = new WebSocketServer({server});
WsStore.set(wss);
app.use('/api/doubts', require('./routes/doubts'));
app.use('/dashboard',require('./middleware/verifyJwt'), require('./routes/dashboard'));
wss.on('connection', (ws,req) => {
    wsMiddleware(ws,req);
    WsStore.set(wss);
})
// Start server after DB connection
connectDb().then(() => {
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
module.exports = wss