const userRoute = require('./user.route');
const conversationRoute = require('./conversation.route');
const gigRoute = require('./gig.route');
const messageRoute = require('./message.route');
const orderRoute = require('./order.route');
const reviewRoute = require('./review.route');
const authRoute = require('./auth.route');

module.exports = {
    authRoute,
    userRoute,
    conversationRoute,
    gigRoute,
    messageRoute,
    orderRoute,
    reviewRoute
}