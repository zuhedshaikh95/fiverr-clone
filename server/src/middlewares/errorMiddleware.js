const errorMiddleware = (error, request, response, next) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong!'

    return response.status(status).send({
        error: true,
        message
    });
}

module.exports = errorMiddleware;