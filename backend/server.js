const express = require('express');
const cors = require('cors');
// const morgan = require('morgan');
const connectDb = require('./config/db');
const cookieParser = require('cookie-parser');
const http = require('http');
const { WebSocketServer } = require('ws');
const wsMiddleware = require('./middleware/wsMiddleware');
const sendNotification = require('./lib/sendNotification');
const WsStore = require('./lib/wsStore');
require('dotenv').config();

const app = express();
const port = 4080;

// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
// app.use(morgan('dev'));
app.use(cookieParser())

// Routes
app.post("/hi",require('./middleware/verifyJwt'), (req, res) => {
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
const server = http.createServer(app);
const wss = new WebSocketServer({server});
WsStore.set(wss);
// console.log(wss);

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