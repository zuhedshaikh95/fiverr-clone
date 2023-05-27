const { User } = require('../models');
const { CustomException } = require('../utils');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const satelize = require('satelize');
const { JWT_SECRET, NODE_ENV } = process.env;
const saltRounds = 10;

const authRegister = async (request, response) => {
    const { username, email, phone, password, image, isSeller, description } = request.body;
    const list = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    const ips = list.split(',');

    try {
        const hash = bcrypt.hashSync(password, saltRounds);
        const { country } = satelize.satelize({ ip: ips[0] }, (error, payload) => payload);
        
        const user = new User({
            username,
            email,
            password: hash,
            image,
            country: country.en,
            description,
            isSeller,
            phone
        });
        await user.save();

        return response.status(201).send({
            error: false,
            message: 'New user created!'
        });
    }
    catch({message}) {
        if(message.includes('E11000')) {
            return response.status(400).send({
                error: true,
                message: 'Choose a unique username!'
            });
        }

        return response.status(500).send({
            error: true,
            message: 'Something went wrong!'
        });
    }
}

const authLogin = async (request, response) => {
    const { username, password } = request.body;

    try {
        const user = await User.findOne({ username });
        if(!user) {
            throw CustomException('Check username or password!', 404);
        }

        const match = bcrypt.compareSync(password, user.password);
        if(match) {
            const { password, ...data } = user._doc;

            const token = jwt.sign({
                _id: user._id,
                isSeller: user.isSeller
            }, JWT_SECRET, { expiresIn: '7 days' });

            const cookieConfig =  {
                httpOnly: true,
                sameSite: NODE_ENV === 'production' ? 'none' : 'strict',
                secure: NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
                path: '/'
            }

            return response.cookie('accessToken', token, cookieConfig)
            .status(202).send({
                error: false,
                message: 'Success!',
                user: data
            })
        }
        
        throw CustomException('Check username or password!', 404);
    }
    catch({ message, status = 500 }) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

const authLogout = async (request, response) => {
    return response.clearCookie('accessToken', {
        sameSite: 'none',
        secure: true
    })
    .send({
        error: false,
        message: 'User have been logged out!'
    });
}

const authStatus = async (request, response) => {
    try {
        const user = await User.findOne({ _id: request.userID }).select('-password');

        if(!user) {
            throw CustomException('User not found!', 404);
        }

        return response.send({
            error: false,
            message: 'Success!',
            user
        })
    }
    catch({message, status = 500}) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

module.exports = {
    authLogin,
    authLogout,
    authRegister,
    authStatus
}