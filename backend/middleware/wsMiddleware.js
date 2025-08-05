const jwt=require('jsonwebtoken');

const wsMiddleware = async(ws, req) => {
    const token = req.headers.cookie?.split('=')[1];    
    if (!token) return ws.close(1008, 'No token, authorization denied');
    try {    
        //verify the token and proceed with the route
        const decoded=jwt.verify(token,process.env.JWT_KEY||'123');
        ws.email=decoded.email;
    } catch (err) {
        // console.log(err);
        ws.close(1008, 'token authorization failed');
    }
}
module.exports=wsMiddleware;