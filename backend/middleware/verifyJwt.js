const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    try {
        //verify the token and proceed with the route
        const decoded=jwt.verify(token,process.env.JWT_KEY||'123');
        req.user=decoded;
        next();
    } catch (err) {
        console.error(err);
        res.clearCookie('token');
        return res.status(401).json({message:'token authorization failed'});
    }
};

module.exports=checkToken;