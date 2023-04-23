const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { CustomException } = require('../utils');
const saltRounds = 10;
const { JWT_SECRET, NODE_ENV } = process.env;

const authRegister = async (request, response) => {
    const { username, email, password, country, image, isSeller, description } = request.body;

    try {
        const hash = bcrypt.hashSync(password, saltRounds);
        const user = new User({
            username,
            email,
            password: hash,
            image,
            description,
            isSeller,
            country
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
                sameSite: 'none',
                secure: NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
                path: '/'
            }

            console.log(cookieConfig);

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

module.exports = {
    authLogin,
    authLogout,
    authRegister
}