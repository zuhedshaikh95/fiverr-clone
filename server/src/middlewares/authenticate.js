const jwt = require('jsonwebtoken');
const { CustomException } = require("../utils");

const authenticate = (request, response, next) => {
    const { accessToken } = request.cookies;

    try {
        if (!accessToken) {
            throw CustomException('Access denied!', 401);
        }

        const verification = jwt.verify(accessToken, process.env.JWT_SECRET);
        if(verification) {
            request.userID = verification._id;
            return next();
        }

        throw CustomException('Access denied!', 401);
    }
    catch({ message, status = 500 }) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

module.exports = authenticate;