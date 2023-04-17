const { Message, Conversation } = require('../models');

const createMessage = async (request, response) => {
    const { conversationID, description } = request.body;

    try {
        const message = new Message({
            conversationID,
            userID: request.userID,
            description
        })

        await message.save();
        await Conversation.findOneAndUpdate({ conversationID }, {
            $set: {
                readBySeller: request.isSeller,
                readByBuyer: !request.isSeller,
                lastMessage: description
            }
        }, { new: true });

        return response.status(201).send(message);
    }
    catch({message, status = 500}) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

const getMessages = async (request, response) => {
    const { conversationID } = request.params;
    try {
        const messages = await Message.find({ conversationID }).populate('userID', 'username image email');
        return response.send(messages);
    }
    catch({message, status = 500}) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

module.exports = {
    createMessage,
    getMessages
}