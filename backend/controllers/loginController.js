const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'user cant be found!' });
        }
       
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }


        //creating jwt token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
            expiresIn: '3h',
        });

        res.json(
            {
                success: true,
                message: 'Login Successful',
                user: { username: user.username }
            });
    } catch (err) {
        return res.status(500)({ success: false, message: 'Server error' });
    }


};