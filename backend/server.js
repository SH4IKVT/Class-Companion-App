const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDb = require('./config/db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4080;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));

app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Start server after DB connection
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});