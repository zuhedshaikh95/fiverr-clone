const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser')) || false;
}

export default getCurrentUser;