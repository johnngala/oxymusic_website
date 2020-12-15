const config = require('config')
const jwt = require('jsonwebtoken')

function auth( req ,res , next) {
    const token = req.header('x-auth-token')

    //Check for token
    if(!token) return res.status(401).json({msg : 'No token ,Access denied'})

    try{
        //Verify token 
        const decoded = jwt.verify(token , config.get('jwtSecret'))
        //add user from payload 
        req.user = decoded;
        next();

    }catch(e){
        res.status(400).json({ msg : 'Token not valid'});
    }
}

module.exports = auth;