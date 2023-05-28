const jwt = require('jsonwebtoken');
const { CustomException } = require('../utils');
const { authLogout } = require('../controllers/auth.controller');

const userMiddleware = (request, response, next) => {
    const token = request.cookies.accessToken;
    
    try {
        if(!token) {
            throw CustomException('Unauthorized access!', 400);
        }
        
        const verification = jwt.verify(token, process.env.JWT_SECRET);
        if(verification) {
            request.userID = verification._id;
            request.isSeller = verification.isSeller;
            
            return next();
        }
        
        authLogout(request, response);
        throw CustomException('Relogin', 400);
    }
    catch({message, status = 500}) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

module.exports = userMiddleware;