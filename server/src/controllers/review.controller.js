const { Review, Gig } = require('../models');
const { CustomException } = require('../utils');

const createReview = async(request, response) => {
    const { gigID, star, description } = request.body;

    try {
        if(request.isSeller) {
            throw CustomException("Sellers can't create reviews!", 403);
        }
        const review = new Review({
            userID: request.userID,
            gigID,
            star,
            description
        });
        await Gig.findByIdAndUpdate(gigID, { $inc: { totalStars: star, starNumber: 1 } });
        await review.save();

        return response.status(201).send({
            error: false,
            review
        })
    }
    catch({message, status = 500}) {
        return response.status(status).send({
            error: false,
            message
        })
    }
}

const getReview = async (request, response) => {
    const { gigID } = request.params;
    
    try {
        const reviews = await Review.find({ gigID }).populate('userID', 'username image email country');
        return response.status(201).send(reviews);
    }
    catch({message, status = 500}) {
        return response.status(status).send({
            error: false,
            message
        })
    }
}

const deleteReview = async (request, response) => {

}

module.exports = {
    createReview,
    getReview,
    deleteReview
}