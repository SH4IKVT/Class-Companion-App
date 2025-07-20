const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const auth_head = req.headers.authorization;
    if (!auth_head) return res.status(401).json({ message: 'Missing token' });

    //here we are splitting the token and now we will just be accessing and using its header
    const token = auth_head.split(' ')[1];

    try {
        //verify the token and proceed with the route
        const decoded=jwt.verify(token,process.env.JWT_KEY);
        req.user=decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({message:'token authorization failed'});
    }
};

module.exports=checkToken;