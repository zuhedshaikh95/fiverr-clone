const { Conversation } = require('../models');
const { CustomException } = require('../utils');

const createConversation = async (request, response) => {
    const { to, from } = request.body;

    try {
        const conversation = new Conversation({
            sellerID: request.isSeller ? request.userID : to,
            buyerID: request.isSeller ? from : request.userID,
            readBySeller: request.isSeller,
            readByBuyer: !request.isSeller
        });

        await conversation.save();
        return response.status(201).send(conversation);
    }
    catch ({message, status = 500}) {
        return response.status(500).send({
            error: true,
            message
        })
    }
}

const getConversations = async (request, response) => {
    try {
        const conversation = await Conversation.find(request.isSeller ? { sellerID: request.userID } : { buyerID: request.userID }).populate(request.isSeller ? 'buyerID' : 'sellerID', 'username image email').sort({ updatedAt: -1 });
        return response.send(conversation);
    }
    catch ({ message, status = 500 }) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

const getSingleConversation = async (request, response) => {
    const { sellerID, buyerID } = request.params;
    try {
        const conversation = await Conversation.findOne({ sellerID, buyerID });
        if (!conversation) {
            throw CustomException('No such conversation found!', 404);
        }
        return response.send(conversation);
    }
    catch ({ message, status = 500 }) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

const updateConversation = async (request, response) => {
    const { conversationID } = request.params;

    try {
        const conversation = await Conversation.findOneAndUpdate({ conversationID }, {
            $set: {
                readBySeller: true,
                readByBuyer: true
            }
        }, { new: true });

        return response.send(conversation);
    }
    catch ({ message, status = 500 }) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

module.exports = {
    createConversation,
    getConversations,
    getSingleConversation,
    updateConversation
}