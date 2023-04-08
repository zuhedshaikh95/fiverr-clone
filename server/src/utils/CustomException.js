const CustomException = (message, status) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = CustomException;