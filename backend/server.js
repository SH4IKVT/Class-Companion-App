const express = require('express');
const cors = require('cors');
// const morgan = require('morgan');
const connectDb = require('./config/db');
const cookieParser = require('cookie-parser');
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
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));

app.get('/',require('./middleware/verifyJwt'), (req, res) => {
    res.json({upStatus:'Backend is running',user:req.user});
});
app.use('/logout', require('./routes/logout'));

app.use('/api/doubts', require('./routes/doubts'));



// Start server after DB connection
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});